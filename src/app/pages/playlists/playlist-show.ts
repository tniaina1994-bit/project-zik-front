import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './playlist-show.html',
  styleUrl: './playlist-show.css',
})
export class PlaylistShow implements OnInit {
  private service = inject(PlaylistService);
  private route = inject(ActivatedRoute);

  playlist?: Playlist;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.service.get(id).subscribe(data => this.playlist = data);
  }
}
