import axios from "axios";
import type { Album } from "../types/music";

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

interface LastFMResponse {
  results: {
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    albummatches: {
      album: Album[];
    };
  };
}

const musicInstance = axios.create({
  baseURL: "https://ws.audioscrobbler.com/2.0/",
});

export const fetchAlbum = async (
  query: string,
  page: number = 1,
): Promise<LastFMResponse> => {
  const response = await musicInstance.get<LastFMResponse>("", {
    params: {
      method: "album.search",
      album: query,
      api_key: LASTFM_API_KEY,
      page: page,
      limit: 20,
      format: "json",
    },
  });

  return response.data;
};
