import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import AlbumGrid from "../AlbumGrid/AlbumGrid";
import AlbumModal from "../AlbumModal/AlbumModal";
import { fetchAlbums } from "../../services/musicService";
import type { Album } from "../../types/music";
import toast, { Toaster } from "react-hot-toast";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["albums", query, page],
    queryFn: () => fetchAlbums(query, page),
    enabled: query.length > 0,
  });

  const albumsList = data?.results || [];

  useEffect(() => {
    if (query && !isFetching && albumsList.length === 0 && !isError) {
      toast.error(`No albums found for "${query}". Try another search!`);
    }
  }, [albumsList.length, isFetching, query, isError]);

  const handleSearch = (newQuery: string) => {
    if (!newQuery) {
      toast.error("Please enter an artist or group name!");
      return;
    }
    setQuery(newQuery);
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setPage(1);
    setSelectedAlbum(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} onReset={handleReset} />

      <main
        style={{
          padding: "0 20px",
          color: "#111",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {query.length === 0 && (
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>Find your favorite album</h1>
            <p className={styles.heroSubtitle}>
              Your gateway to the global music archive. Search by album title or
              artist.
            </p>
          </div>
        )}

        {isFetching && (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {isError && (
          <p style={{ textAlign: "center", color: "#ff4444", padding: "20px" }}>
            Something went wrong. Please check your API token or connection.
          </p>
        )}

        {query.length > 0 && !isFetching && data && albumsList.length === 0 && (
          <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
            No albums found for "{query}" on Discogs.
          </p>
        )}

        {albumsList.length > 0 && !isFetching && (
          <ReactPaginate
            pageCount={10}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        {albumsList.length > 0 && !isFetching && (
          <AlbumGrid albums={albumsList} onSelect={setSelectedAlbum} />
        )}

        {selectedAlbum && (
          <AlbumModal
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
      </main>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
