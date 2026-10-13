import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-genre-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genre-show.html',
  styleUrl: './genre-show.css',
})
export class GenreShow implements OnInit {
  private service = inject(GenreService);
  private route = inject(ActivatedRoute);

  genre?: Genre;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.service.get(id).subscribe(data => this.genre = data);
  }
}
