import SiteLayout from '@self/components/SiteLayout';
import { getAllPosts, PostData, PostsPageData } from '@self/lib/postData';
import PaginatedPostListPage from './p/[pageNum]';

interface HomeProps {
  posts: PostData[];
  page: PostsPageData | null;
}

export default function Home({ posts, page }: HomeProps) {
  return <PaginatedPostListPage posts={posts} page={page} />;
}

export async function getStaticProps() {
  const { pages, map } = await getAllPosts();
  return {
    props: {
      posts: pages.length > 0 ? pages[0].ids.map((id) => map[id]) : [],
      page: pages.length > 0 ? pages[0] : null,
    },
  };
}
