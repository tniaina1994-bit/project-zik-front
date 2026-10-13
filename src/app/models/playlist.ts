export interface Playlist {
  id: number;
  title: string;
  description?: string;
  cover_image?: string;
  is_public: boolean;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}
