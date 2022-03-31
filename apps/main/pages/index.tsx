import SiteLayout from '@self/components/SiteLayout';
import { getAllPosts, PostData } from '@self/lib/postData';
import PostsListLayout from '@self/components/PostsListLayout';

interface HomeProps {
  postList: PostData[];
  hasNextPage: boolean;
}

export default function Home({ postList, hasNextPage }: HomeProps) {
  return (
    <SiteLayout>
      <PostsListLayout postList={postList} />
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const { pages, map } = await getAllPosts();
  return {
    props: {
      postList: pages.length > 0 ? pages[0].ids.map((id) => map[id]) : [],
      hasNextPage: pages.length > 1,
    },
  };
}
