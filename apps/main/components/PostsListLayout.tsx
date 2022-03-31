import { FormattedDate } from '@libs/common';
import { PostData } from '@self/lib/postData';
import Link from 'next/link';

// import styles from './PostsListLayout.module.scss';

type PostsListLayoutProps = {
  postList: PostData[];
};

export default function PostsListLayout({ postList }: PostsListLayoutProps) {
  if (postList.length === 0) {
    return (
      <div className="my-16 md:my-32 opacity-80">
        <p className="text-2xl md:text-4xl mb-0">There are no posts here at the moment.</p>
        <p className="mt-1">Check back later for updates.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-none">
        {postList.map(({ id, meta }) => (
          <li className="mb-3 md:mb-8" key={id}>
            <Link href={`/posts/${id}`}>
              <a title={meta.title}>
                <h4>{meta.title}</h4>
              </a>
            </Link>
            <FormattedDate rawDate={meta.date}></FormattedDate>
          </li>
        ))}
      </ul>
    </div>
  );
}
