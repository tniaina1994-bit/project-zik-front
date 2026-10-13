export interface Album {
  id: number;
  title: string;
  slug: string;
  artist_id: number;
  release_year?: number;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
}
