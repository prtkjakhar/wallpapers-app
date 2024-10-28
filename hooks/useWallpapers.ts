import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Wallpaper {
  url: string;
  id: string;
  src: any;
  alt: string; 
  photographer: string;
  width: number;
  height: number;
}

export function useWallpapers(query = 'mobile wallpapers'): { wallpapers: Wallpaper[]; isLoading: boolean; error: Error | null } {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWallpapers = async () => {
      if (!query.trim()) return;
      setIsLoading(true);
      try {
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURI(query)}&orientation=portrait&per_page=12`, {
          headers: {
            "Authorization": ""
          }
        });
        setWallpapers(res.data.photos as Wallpaper[]);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallpapers();
  }, [query]);

  return { wallpapers, isLoading, error };
}
