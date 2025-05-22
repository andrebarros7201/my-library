export interface Book {
  id: string;
  userID: string;
  cover_i?: number;
  imageURL_S: string;
  imageURL_M: string;
  imageURL_L: string;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  key: string;
  status: string;
}

export interface BookResponse {
  docs: Book[];
  start: number;
  num_Found: number;
}

