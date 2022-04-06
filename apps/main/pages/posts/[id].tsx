import { getAllPosts, PostData } from '@self/lib/postData';
import SiteLayout from '@self/components/SiteLayout';
import PostPaginator from '@self/components/PostPaginator';
import PostLayout from '@self/components/PostLayout';
import Utterances from '@self/components/Utterances';
import { useTheme } from 'next-themes';

type PostPageProps = {
  post: PostData;
  nextPost?: PostData;
  prevPost?: PostData;
};

export default function PostPage({ post, nextPost, prevPost }: PostPageProps) {
  const { resolvedTheme } = useTheme();
  const utterancesTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  return (
    <SiteLayout title={post.meta.title}>
      <PostLayout post={post} />
      <PostPaginator nextPost={nextPost} prevPost={prevPost} />
      <Utterances
        repo="mauris/site-content"
        config={{ 'issue-term': post.id, label: 'utterances-comments', theme: utterancesTheme }}
      />
    </SiteLayout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const { allIds } = await getAllPosts();
  return {
    paths: allIds.map((id) => ({ params: { id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const { map } = await getAllPosts();
  const props: PostPageProps = {
    post: map[params.id],
  };

  if (props.post.prevId) {
    props.prevPost = map[props.post.prevId];
  }

  if (props.post.nextId) {
    props.nextPost = map[props.post.nextId];
  }

  return {
    props,
  };
}
