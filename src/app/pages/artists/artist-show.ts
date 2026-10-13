import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './artist-show.html',
  styleUrl: './artist-show.css',
})
export class ArtistShow implements OnInit {
  private service = inject(ArtistService);
  private route = inject(ActivatedRoute);

  artist?: Artist;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.service.get(id).subscribe(data => this.artist = data);
  }
}
