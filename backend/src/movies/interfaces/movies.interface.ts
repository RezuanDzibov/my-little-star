export interface Movie {
  name: string;
  shortDescription: string;
  year: number;
  poster: {
    url: string;
    previewUrl: string;
  };
}
