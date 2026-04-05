export interface IArticle {
  articleId: number;
  headline: string;
  subHeading: string;
  articleContent: string;
  status: string;
  rating: number;
  categoryId: number;
  categoryName: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorUsername: string;
  imageId: number;
  imagePath: string;
  imageName: string;
  imageContentType: string;

  editorId: number;
  mediaId: number;
}
