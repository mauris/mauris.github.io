import { PostData } from '@self/lib/postData';
import Link from 'next/link';

import styles from './PostPaginator.module.scss';

type PostPaginatorProps = {
  nextPost?: PostData;
  prevPost?: PostData;
};

export default function PostPaginator({ nextPost, prevPost }: PostPaginatorProps) {
  return (
    <div className={styles.paginator}>
      <div className={styles.paginatorPrev}>
        {prevPost && (
          <div>
            <span className={styles.paginatorLabel}>&#8592; Previous Post</span>
            <Link href={`/posts/${prevPost.id}`}>{prevPost.meta.title}</Link>
          </div>
        )}
      </div>

      <div className={styles.paginatorNext}>
        {nextPost && (
          <div>
            <span className={styles.paginatorLabel}>Next Post &#8594;</span>
            <Link href={`/posts/${nextPost.id}`}>{nextPost.meta.title}</Link>
          </div>
        )}
      </div>
    </div>
  );
}
