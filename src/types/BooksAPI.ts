export interface VolumeInfo {
  title: string;
  authors: string[];
  categories: string[];
  imageLinks: {
    thumbnail: string;
  };
}
export interface Item {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface LibraryBooks {
  items: Item[];
  totalItems: any;
  queryResult: string;
  categoryResult: string;
  sortResult: string;
}

export interface LibraryState {
  LibraryBooks: LibraryBooks | null;
  selectedBook: any;
  loading: boolean;
  isSearch: boolean;
  queryResult: string;
  categoryResult: string;
  sortResult: string;
}
export interface Props {
  query: string;
  category: string;
  sort: string;
}
export interface FetchBooksPayload {
  query: string;
  category: string;
  sort: string;
  startIndex: number;
}
