export interface Book {
  cover_i: number;
  has_fulltext: string;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  ia: string[];
  author_key: string;
  public_scan_b: boolean;
}

export interface BookResponse {
  docs: Book[];
  start: number;
  num_Found: number;
}