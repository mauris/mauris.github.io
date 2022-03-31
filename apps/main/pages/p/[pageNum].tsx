import { getAllPosts, PostData, PostsPageData } from '@self/lib/postData';
import SiteLayout from '@self/components/SiteLayout';
import PostsListLayout from '@self/components/PostsListLayout';

type PaginatedPostListPageProps = {
  posts: PostData[];
  page: PostsPageData;
};

export default function PaginatedPostListPage({ posts }: PaginatedPostListPageProps) {
  return (
    <SiteLayout>
      <PostsListLayout postList={posts} />
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

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const { pages, map } = await getAllPosts();
  const page = pages[params.pageNum - 1];

  const props: PaginatedPostListPageProps = {
    posts: page.ids.map((id) => map[id]),
    page,
  };

  return {
    props,
  };
}
