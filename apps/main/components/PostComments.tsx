import { PostData } from '@/lib/postData';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useIsMounted } from '@libs/common';

type PostCommentsProps = {
  post: PostData;
};

export default function PostComments({ post }: PostCommentsProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();

  return (
    <Giscus
      id="comments"
      repo="mauris/site-content"
      repoId="R_kgDOHH9MQA"
      category="General"
      categoryId="DIC_kwDOHH9MQM4CObUL"
      mapping="specific"
      term={post.id}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={mounted ? resolvedTheme : 'light'}
      lang="en"
      loading="lazy"
    />
  );
}
