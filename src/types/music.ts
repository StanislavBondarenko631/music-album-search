export interface Album {
  id: number;
  title: string;
  cover_image: string;
  year?: string;
}

export interface AlbumDetails {
  id: number;
  title: string;
  artists_sort: string;
  notes?: string;
  genres?: string[];
  styles?: string[];
}
