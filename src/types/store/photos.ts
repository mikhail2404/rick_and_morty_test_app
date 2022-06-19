export interface PhotosState {
  photos: Photos[];
}

export interface Photos {
  userPhotos: Photo[];
  id: number;
}

export interface Photo {
  url: string;
  id: string;
}
