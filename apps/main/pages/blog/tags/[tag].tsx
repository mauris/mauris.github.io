import { getAllPosts, PostData, PostsPageData } from '@self/lib/postData';
import SiteLayout from '@self/components/SiteLayout';
import PostsListLayout from '@self/components/PostsListLayout';
import PostsListPaginator from '@self/components/PostsListPaginator';

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

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.tag
  const { tagsMap, map } = await getAllPosts();
  const pageIds = tagsMap[params.tag];

  const props: PaginatedPostsListByTagProps = {
    posts: pageIds.map((id) => map[id]),
    tag: params.tag,
  };

  return {
    props,
  };
}
