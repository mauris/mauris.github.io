import { getAllPosts, PostData, PostsPageData } from '@/lib/postData';
import SiteLayout from '@/components/SiteLayout';
import PostsListLayout from '@/components/PostsListLayout';
import PostsListPaginator from '@/components/PostsListPaginator';
import { GetStaticProps } from 'next';

type PaginatedPostListPageProps = {
  posts: PostData[];
  page: PostsPageData | null;
};

export default function PaginatedPostListPage({ posts, page }: PaginatedPostListPageProps) {
  return (
    <SiteLayout>
      <PostsListLayout postList={posts} />

      <PostsListPaginator page={page} />
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  const { pages } = await getAllPosts();
  return {
    paths: pages.map((_page, pageNum) => ({
      params: { pageNum: String(pageNum + 1) },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<PaginatedPostListPageProps, { pageNum: string }> = async ({ params }) => {
  const { pages, map } = await getAllPosts();
  const pageIndex = parseInt(params?.pageNum ?? '1', 10) - 1;
  const page = pageIndex >= 0 && pageIndex < pages.length ? pages[pageIndex] : null;

  const props: PaginatedPostListPageProps = {
    posts: page ? page.ids.map((id) => map[id]) : [],
    page,
  };

  return {
    props,
  };
};
