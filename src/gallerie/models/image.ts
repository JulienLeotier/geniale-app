export interface IImageResponse {
  image: IImage;
}

export interface IImage {
  id: string;
  file_path: string;
}

export interface IImagesResponse {
  images: IImage[];
}

export interface IResponse {
  message: string;
}
