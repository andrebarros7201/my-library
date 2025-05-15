export interface Book {
  cover_i: number;
  imageURL_S: string;
  imageURL_M: string;
  imageURL_L: string;
  has_fulltext: boolean;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  ia: string[];
  author_key: string[];
  public_scan_b: boolean;
}

export interface BookResponse {
  docs: Book[];
  start: number;
  num_Found: number;
}