import { getAllPosts, PostData } from '@/lib/postData';
import Head from 'next/head';
import SiteLayout from '@/components/SiteLayout';
import PostPaginator from '@/components/PostPaginator';
import PostLayout from '@/components/PostLayout';
import PostComments from '@/components/PostComments';
import { GetStaticProps } from 'next';

type PostPageProps = {
  post: PostData;
  nextPost?: PostData;
  prevPost?: PostData;
};

export default function PostPage({ post, nextPost, prevPost }: PostPageProps) {
  return (
    <SiteLayout title={post.meta.title}>
      <Head>
        <meta property="og:title" content={post.meta.title} key="title" />
        {post.meta.coverImage && <meta property="og:image" content={post.meta.coverImage} key="image" />}
      </Head>
      <PostLayout post={post} />
      <PostPaginator nextPost={nextPost} prevPost={prevPost} />
      <PostComments post={post} />
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

export const getStaticProps: GetStaticProps<PostPageProps, { id: string }> = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const { map } = await getAllPosts();
  const props: PostPageProps = {
    post: map[params?.id as string],
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
};
