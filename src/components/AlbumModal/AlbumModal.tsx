import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./AlbumModal.module.css";
import { fetchAlbumDetails } from "../../services/musicService";
import type { Album } from "../../types/music";

interface AlbumModalProps {
  album: Album;
  onClose: () => void;
}

export default function AlbumModal({ album, onClose }: AlbumModalProps) {
  const { data: details, isFetching } = useQuery({
    queryKey: ["albumDetails", album.id],
    queryFn: () => fetchAlbumDetails(album.id),
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [artistName, albumName] = album.title.split(" - ");
  const displayArtist = artistName ? artistName.trim() : "Unknown Artist";
  const displayAlbum = albumName ? albumName.trim() : album.title;

  const imageUrl = album.cover_image || "";

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <img src={imageUrl} alt={displayAlbum} className={styles.image} />
          ) : (
            <div
              className={styles.image}
              style={{
                backgroundColor: "#eaeaea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              🎵 No Cover AVAILABLE
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{displayAlbum}</h2>
          <p className={styles.artist}>{displayArtist}</p>
          {album.year && <p className={styles.year}>Released: {album.year}</p>}

          {isFetching ? (
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                marginTop: "12px",
                fontStyle: "italic",
              }}
            >
              Loading album history from Discogs...
            </p>
          ) : details?.notes ? (
            <div className={styles.description}>{details.notes}</div>
          ) : (
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                marginTop: "12px",
                fontStyle: "italic",
              }}
            >
              No additional notes available for this release.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
