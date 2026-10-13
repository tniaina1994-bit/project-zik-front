import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-album-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './album-show.html',
  styleUrl: './album-show.css',
})
export class AlbumShow implements OnInit {
  private service = inject(AlbumService);
  private artistService = inject(ArtistService);
  private route = inject(ActivatedRoute);

  album?: Album;
  artists: Artist[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.artistService.getAll().subscribe(data => this.artists = data);
    this.service.get(id).subscribe(data => this.album = data);
  }

  getArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.name || `Artiste #${id}`;
  }
}
