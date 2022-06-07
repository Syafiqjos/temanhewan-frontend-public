export default interface Comment {
  id?: string;
  content: string;
  comment_images?: string[];
  author: Record<string, unknown>;
  updated_at: string;
}