import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { GenreService } from '../../services/genre.service';
import { Track } from '../../models/track';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-track-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './track-show.html',
  styleUrl: './track-show.css',
})
export class TrackShow implements OnInit {
  private service = inject(TrackService);
  private artistService = inject(ArtistService);
  private albumService = inject(AlbumService);
  private genreService = inject(GenreService);
  private route = inject(ActivatedRoute);

  track?: Track;
  artists: Artist[] = [];
  albums: Album[] = [];
  genres: Genre[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.artistService.getAll().subscribe(data => this.artists = data);
    this.albumService.getAll().subscribe(data => this.albums = data);
    this.genreService.getAll().subscribe(data => this.genres = data);
    this.service.get(id).subscribe(data => this.track = data);
  }

  getArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.name || `Artiste #${id}`;
  }

  getAlbumTitle(id?: number): string {
    if (!id) return 'Aucun';
    return this.albums.find(a => a.id === id)?.title || `Album #${id}`;
  }

  getGenreName(id: number): string {
    return this.genres.find(g => g.id === id)?.name || `Genre #${id}`;
  }

  getGenreColor(id: number): string {
    return this.genres.find(g => g.id === id)?.color || '#666';
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
