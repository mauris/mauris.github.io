import { getAllPosts, PostData } from '@/lib/postData';
import SiteLayout from '@/components/SiteLayout';
import PostsListLayout from '@/components/PostsListLayout';
import { GetStaticProps } from 'next';

type PaginatedPostsListByTagProps = {
  posts: PostData[];
  tag: string;
};

export default function PaginatedPostsListByTag({ posts, tag }: PaginatedPostsListByTagProps) {
  return (
    <SiteLayout>
      <h2>{`Posts tagged ${tag}`}</h2>
      <PostsListLayout postList={posts} />
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  const { tagsMap } = await getAllPosts();
  const allTags = Object.keys(tagsMap);
  return {
    paths: allTags.map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<PaginatedPostsListByTagProps, { tag: string }> = async ({ params }) => {
  // Fetch necessary data for the blog post using params.tag
  const { tagsMap, map } = await getAllPosts();
  const pageIds = tagsMap[params?.tag as string];

  const props: PaginatedPostsListByTagProps = {
    posts: pageIds.map((id) => map[id]),
    tag: params?.tag as string,
  };

  return {
    props,
  };
};
