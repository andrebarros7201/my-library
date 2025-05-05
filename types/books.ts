export interface IndustryIdentifier {
  type: "ISBN_10" | "ISBN_13" | "ISSN" | "OTHER";
  identifier: string;
}

export interface SaleInfo {
  country: string;
  saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FREE" | "FOR_PREORDER";
  isEbook: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface Dimensions {
  height: string;
  width: string;
  thickness?: string;
}

export interface BookInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  dimensions?: Dimensions;
  printType?: string;
  mainCategory: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface AccessInfo {
  country: string;
  viewability: "PARTIAL" | "ALL_PAGES" | "NO_PAGES" | "UNKNOWN";
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: "ALLOWED" | "NOT_ALLOWED";
}

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
}

export interface BookSearchResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}