import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css',
})
export class Playlists implements OnInit {
  private service = inject(PlaylistService);
  private fb = inject(FormBuilder);

  playlists: Playlist[] = [];
  editing: Playlist | null = null;
  showForm = false;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    cover_image: [''],
    is_public: [true],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => this.playlists = data);
  }

  openCreate(): void {
    this.editing = null;
    this.form.reset({ is_public: true });
    this.showForm = true;
  }

  openEdit(playlist: Playlist): void {
    this.editing = playlist;
    this.form.patchValue(playlist);
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
    if (confirm('Supprimer cette playlist ?')) {
      this.service.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}
