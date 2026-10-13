export interface Track {
  id: number;
  title: string;
  slug: string;
  artist_id: number;
  album_id?: number;
  duration: number;
  file_path?: string;
  genres?: number[];
  created_at?: string;
  updated_at?: string;
}
