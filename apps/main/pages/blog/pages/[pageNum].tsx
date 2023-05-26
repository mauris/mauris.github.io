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
  // Fetch necessary data for the blog post using params.id
  const { pages, map } = await getAllPosts();
  const page = pages[Number(params?.pageNum) ?? 1 - 1];

  const props: PaginatedPostListPageProps = {
    posts: page.ids.map((id) => map[id]),
    page,
  };

  return {
    props,
  };
};
