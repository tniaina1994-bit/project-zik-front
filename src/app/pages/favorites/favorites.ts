import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { ArtistService } from '../../services/artist.service';
import { Track } from '../../models/track';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  private service = inject(FavoriteService);
  private artistService = inject(ArtistService);

  tracks: Track[] = [];
  artists: Artist[] = [];

  ngOnInit(): void {
    this.artistService.getAll().subscribe(data => this.artists = data);
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => this.tracks = data);
  }

  getArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.name || `Artiste #${id}`;
  }

  remove(trackId: number): void {
    if (confirm('Retirer des favoris ?')) {
      this.service.remove(trackId).subscribe(() => this.load());
    }
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
