import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import fetch from 'node-fetch';

export interface PostMeta {
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
  tagsMap: { [k: string]: string[] };
}

export async function fetchJson<T>(url: string) {
  const response = await fetch(url, { method: 'GET' });
  return (await response.json()) as T;
}

export async function fetchRaw(url: string) {
  const response = await fetch(url, { method: 'GET' });
  return response.text();
}

function mapFileToObject(id: string, fileContents: string) {
  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    meta: data as PostMeta,
    content,
  };
}

async function retrieveFileList() {
  const dirPath = path.resolve(process.cwd(), 'blog');
  console.log(`Fetching all posts content from ${dirPath}`);
  const files = fs.readdirSync(dirPath);
  console.log(`${files.length} posts found`);

  return Promise.all(
    files.map(async (file) => {
      // Remove ".md" from file name to get id
      const id = file.replace(/\.md$/, '');
      const fileContents = await readFileContent(path.join(dirPath, file));

      return mapFileToObject(id, fileContents);
    }),
  );
}

let allPostsMemo: GetAllPostsResult | null = null;
export async function getAllPosts() {
  if (allPostsMemo) {
    return allPostsMemo;
  }

  const allPostsData: PostData[] = await retrieveFileList();
  const all = getSortedPosts(allPostsData);
  linkPostsNextPrev(all);

  const pages = buildPostListPages(all, 10);
  const tagsMap = buildPostsByTags(all);

  const result: GetAllPostsResult = {
    allIds: all.map((p) => p.id),
    all,
    map: all.reduce((acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    }, {} as { [key: string]: PostData }),
    tagsMap,
    pages,
  };
  allPostsMemo = result;
  return result;
}

function buildPostsByTags(posts: PostData[]) {
  const mapping = posts.reduce((acc, cur) => {
    cur.meta.tags?.forEach((tag) => {
      if (!(tag in acc)) {
        acc[tag] = [];
      }
      acc[tag].push(cur.id);
    });
    return acc;
  }, {} as { [k: string]: string[] });
  return mapping;
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
      return a.id.localeCompare(b.id);
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
