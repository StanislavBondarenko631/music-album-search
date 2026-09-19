import axios from "axios";
import type { Album, AlbumDetails } from "../types/music";

const DISCOGS_TOKEN = import.meta.env.VITE_DISCOGS_TOKEN;

interface DiscogsSearchResponse {
  results: Album[];
}

const musicInstance = axios.create({
  baseURL: "https://api.discogs.com",
  headers: {
    "User-Agent": "MyMusicSearchApp/1.0",
    Authorization: `Discogs token=${DISCOGS_TOKEN}`,
  },
});

export const fetchAlbums = async (
  query: string,
  page: number = 1,
): Promise<DiscogsSearchResponse> => {
  const response = await musicInstance.get<DiscogsSearchResponse>(
    "/database/search",
    {
      params: {
        q: query,
        type: "release",
        per_page: 15,
        page: page,
      },
    },
  );

  return response.data;
};

export const fetchAlbumDetails = async (
  releaseId: number,
): Promise<AlbumDetails> => {
  const response = await musicInstance.get<AlbumDetails>(
    `/releases/${releaseId}`,
  );
  return response.data;
};
