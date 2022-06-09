export default interface Forum {
  id?: string;
  slug?: string;
  title: string;
  subtitle: string;
  content: string;
  forum_images: string[];
  author: Record<string, unknown>;
  updated_at: string;
}
