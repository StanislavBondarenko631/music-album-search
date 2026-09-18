export interface AlbumImage {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: AlbumImage[];
  mbid?: string;
}
