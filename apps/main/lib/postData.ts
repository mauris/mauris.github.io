import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  coverImageCaption?: string;
}

export interface PostData {
  id: string;
  meta: PostMeta;
  content: string;
  nextId?: string;
  prevId?: string;
}

export interface PostsPageData {
  pageIdx: number;
  ids: string[];
  hasPrev: boolean;
  hasNext: boolean;
}

type PostDataByIdMap = { [key: string]: PostData };

interface GetAllPostsResult {
  allIds: string[];
  all: PostData[];
  map: PostDataByIdMap;
  pages: PostsPageData[];
}

let postDataMemo: GetAllPostsResult = null;
export async function getAllPosts() {
  if (postDataMemo) {
    return postDataMemo;
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await readFileContent(fullPath);

      // Use gray-matter to parse the post metadata section
      const { content, data } = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        meta: data as PostMeta,
        content,
      };
    }),
  );

  const all = getSortedPosts(allPostsData);
  linkPostsNextPrev(all);

  const pages = buildPostListPages(all, 10);

  const result: GetAllPostsResult = {
    allIds: all.map((p) => p.id),
    all,
    map: all.reduce((acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    }, {}),
    pages,
  };
  postDataMemo = result;
  return result;
}

function readFileContent(filePath: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function linkPostsNextPrev(sortedPosts: PostData[]) {
  for (let i = 1; i < sortedPosts.length; i += 1) {
    sortedPosts[i - 1].prevId = sortedPosts[i].id;
    sortedPosts[i].nextId = sortedPosts[i - 1].id;
  }
}

function getSortedPosts(posts: PostData[]) {
  // Sort posts by date
  return [...posts].sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else if (a.meta.date > b.meta.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

function buildPostListPages(sortedPosts: PostData[], postsPerPage: number) {
  const pages: PostsPageData[] = [];
  for (let i = 0; i < sortedPosts.length; i += postsPerPage) {
    const page = sortedPosts.slice(i, i + postsPerPage);
    pages.push({
      pageIdx: pages.length + 1,
      ids: page.map((p) => p.id),
      hasPrev: true,
      hasNext: true,
    });
  }

  if (pages.length > 0) {
    pages[0].hasPrev = false;
    pages[pages.length - 1].hasNext = false;
  }
  return pages;
}
