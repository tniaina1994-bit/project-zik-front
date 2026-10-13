import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
})
export class Genres implements OnInit {
  private service = inject(GenreService);
  private fb = inject(FormBuilder);

  genres: Genre[] = [];
  editing: Genre | null = null;
  showForm = false;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    color: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => this.genres = data);
  }

  openCreate(): void {
    this.editing = null;
    this.form.reset();
    this.showForm = true;
  }

  openEdit(genre: Genre): void {
    this.editing = genre;
    this.form.patchValue(genre);
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
    if (confirm('Supprimer ce genre ?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
