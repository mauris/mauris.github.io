import { FormattedDate } from '@libs/common';
import { getLinkToPost } from '@/lib/links';
import { PostData } from '@/lib/postData';
import Link from 'next/link';

import styles from './PostsListLayout.module.scss';

type PostsListLayoutProps = {
  postList: PostData[];
};

export default function PostsListLayout({ postList }: PostsListLayoutProps) {
  if (postList.length === 0) {
    return (
      <div className={styles.emptyMessageContainer}>
        <p className={styles.emptyMessageMainText}>There are no posts here at the moment.</p>
        <p className="mt-1">Check back later for updates.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-none">
        {postList.map((post) => (
          <li className={styles.listPostItem} key={post.id}>
            <Link href={getLinkToPost(post)} title={post.meta.title} passHref>
              <h4>{post.meta.title}</h4>
            </Link>
            <FormattedDate rawDate={post.meta.date}></FormattedDate>
          </li>
        ))}
      </ul>
    </div>
  );
}
