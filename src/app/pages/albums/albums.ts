import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class Albums implements OnInit {
  private service = inject(AlbumService);
  private artistService = inject(ArtistService);
  private fb = inject(FormBuilder);

  albums: Album[] = [];
  artists: Artist[] = [];
  editing: Album | null = null;
  showForm = false;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    artist_id: [0, Validators.required],
    release_year: [new Date().getFullYear()],
    cover_image: [''],
  });

  ngOnInit(): void {
    this.load();
    this.artistService.getAll().subscribe(data => this.artists = data);
  }

  load(): void {
    this.service.getAll().subscribe(data => this.albums = data);
  }

  openCreate(): void {
    this.editing = null;
    this.form.reset({ release_year: new Date().getFullYear() });
    this.showForm = true;
  }

  openEdit(album: Album): void {
    this.editing = album;
    this.form.patchValue(album);
    this.showForm = true;
  }

  cancel(): void {
    this.showForm = false;
    this.editing = null;
  }

  submit(): void {
    if (this.form.invalid) return;
    const data = this.form.getRawValue();
    if (this.editing) {
      this.service.update(this.editing.id, data).subscribe(() => {
        this.load();
        this.cancel();
      });
    } else {
      this.service.create(data).subscribe(() => {
        this.load();
        this.cancel();
      });
    }
  }

  delete(id: number): void {
    if (confirm('Supprimer cet album ?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

  getArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.name || `Artiste #${id}`;
  }
}
