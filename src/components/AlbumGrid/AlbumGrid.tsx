import styles from "./AlbumGrid.module.css";

import AlbumCard from "../AlbumCard/AlbumCard";
import type { Album } from "../../types/music";

interface AlbumGridProps {
  albums: Album[];
  onSelect: (album: Album) => void;
}

export default function AlbumGrid({ albums, onSelect }: AlbumGridProps) {
  return (
    <div className={styles.grid}>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onSelect={onSelect} />
      ))}
    </div>
  );
}
