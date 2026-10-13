import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackService } from '../../services/track.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { GenreService } from '../../services/genre.service';
import { Track } from '../../models/track';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './tracks.html',
  styleUrl: './tracks.css',
})
export class Tracks implements OnInit {
  private service = inject(TrackService);
  private artistService = inject(ArtistService);
  private albumService = inject(AlbumService);
  private genreService = inject(GenreService);
  private fb = inject(FormBuilder);

  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  genres: Genre[] = [];
  editing: Track | null = null;
  showForm = false;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    artist_id: [0, Validators.required],
    album_id: [0],
    duration: [0, Validators.required],
    file_path: [''],
  });

  selectedGenres: number[] = [];

  ngOnInit(): void {
    this.load();
    this.artistService.getAll().subscribe(data => this.artists = data);
    this.albumService.getAll().subscribe(data => this.albums = data);
    this.genreService.getAll().subscribe(data => this.genres = data);
  }

  load(): void {
    this.service.getAll().subscribe(data => this.tracks = data);
  }

  openCreate(): void {
    this.editing = null;
    this.form.reset({ duration: 0 });
    this.selectedGenres = [];
    this.showForm = true;
  }

  openEdit(track: Track): void {
    this.editing = track;
    this.form.patchValue(track);
    this.selectedGenres = track.genres || [];
    this.showForm = true;
  }

  cancel(): void {
    this.showForm = false;
    this.editing = null;
  }

  toggleGenre(genreId: number): void {
    const idx = this.selectedGenres.indexOf(genreId);
    if (idx === -1) {
      this.selectedGenres.push(genreId);
    } else {
      this.selectedGenres.splice(idx, 1);
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    const data = { ...this.form.getRawValue(), genres: this.selectedGenres };
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
    if (confirm('Supprimer ce morceau ?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

  getArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.name || `Artiste #${id}`;
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
