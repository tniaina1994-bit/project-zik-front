import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
})
export class Artists implements OnInit {
  private service = inject(ArtistService);
  private fb = inject(FormBuilder);

  artists: Artist[] = [];
  editing: Artist | null = null;
  showForm = false;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    bio: [''],
    image: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: data => this.artists = data,
      error: err => console.error('Erreur chargement artistes:', err),
    });
  }

  openCreate(): void {
    this.editing = null;
    this.form.reset();
    this.showForm = true;
  }

  openEdit(artist: Artist): void {
    this.editing = artist;
    this.form.patchValue(artist);
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
    if (confirm('Supprimer cet artiste ?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
