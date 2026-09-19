import styles from "./AlbumCard.module.css";
import type { Album } from "../../types/music";

interface AlbumCardProps {
  album: Album;
  onSelect: (album: Album) => void;
}

export default function AlbumCard({ album, onSelect }: AlbumCardProps) {
  const [artistName, albumName] = album.title.split(" - ");

  const displayArtist = artistName ? artistName.trim() : "Unknown Artist";
  const displayAlbum = albumName ? albumName.trim() : album.title;

  const imageUrl = album.cover_image || "";

  return (
    <div className={styles.card} onClick={() => onSelect(album)}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={displayAlbum} className={styles.image} />
        ) : (
          <div
            className={styles.image}
            style={{
              backgroundColor: "#eaeaea",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              gap: "4px",
            }}
          >
            <span>🎵 No Cover</span>
            {album.year && (
              <span style={{ fontSize: "12px" }}>({album.year})</span>
            )}
          </div>
        )}
      </div>
      <h3 className={styles.title} title={displayAlbum}>
        {displayAlbum}
      </h3>
      <p className={styles.artist} title={displayArtist}>
        {displayArtist}
      </p>
    </div>
  );
}
