import { PostData } from './postData';

export function getLinkToPost(post: PostData) {
  return `/blog/posts/${post.id}`;
}

export function getLinkToPostsPage(pageIdx: number) {
  return `/blog/pages/${pageIdx}`;
}

export function getLinkToTag(tag: string) {
  return `/blog/tags/${tag}`;
}
