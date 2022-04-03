import { PostData, PostsPageData } from '@self/lib/postData';
import Link from 'next/link';

import styles from './PostsListPaginator.module.scss';

type PostsListPaginatorProps = {
  page: PostsPageData | null;
};

export default function PostsListPaginator({ page }: PostsListPaginatorProps) {
  if (!page) {
    return null;
  }

  return (
    <div className={styles.paginator}>
      <div className={styles.paginatorPrev}>
        {page.hasPrev && (
          <div>
            <Link href={`/p/${page.pageIdx - 1}`}>&#8592; Previous Page</Link>
          </div>
        )}
      </div>

      <div className={styles.paginatorNext}>
        {page.hasNext && (
          <div>
            <span className={styles.paginatorLabel}></span>
            <Link href={`/p/${page.pageIdx + 1}`}>Next Page &#8594;</Link>
          </div>
        )}
      </div>
    </div>
  );
}
