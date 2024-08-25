export interface Image {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ApiReturn {
  results: Image[];
  total_pages: number;
}
