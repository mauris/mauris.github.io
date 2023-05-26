import { PostData } from '@/lib/postData';
import { FormattedDate } from '@libs/common';
import { Remark } from 'react-remark';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import remarkGemoji from 'remark-gemoji';

import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';
import Image from 'next/image';

import styles from './PostLayout.module.scss';
import { getLinkToPost, getLinkToTag } from '@/lib/links';
import dynamic from 'next/dynamic';

type PostLayoutProps = {
  post: PostData;
};

export default function PostLayout({ post }: PostLayoutProps) {
  return (
    <article className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <h2 className={styles.postTitle}>{post.meta.title}</h2>
        <Link href={getLinkToPost(post)} title="Permalink" passHref>
          <LinkIcon />
        </Link>
      </div>
      <div className={styles.postMetaLine}>
        <FormattedDate rawDate={post.meta.date}></FormattedDate>
        <div className={styles.postTagContainer}>
          {post.meta.tags?.map((tag) => (
            <Link href={getLinkToTag(tag)} key={tag} passHref>
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <PostCoverImage coverImage={post.meta.coverImage} coverImageCaption={post.meta.coverImageCaption} />
      <div className={styles.postContent}>
        <Remark
          remarkPlugins={[remarkGemoji] as any}
          remarkToRehypeOptions={{ allowDangerousHtml: true }}
          rehypePlugins={
            [
              rehypeSlug,
              [
                rehypeAutoLinkHeadings,
                {
                  behavior: 'append',
                  content: transform(
                    <span className={styles.headerLinks}>
                      <LinkIcon />
                    </span>,
                  ),
                },
              ],
              rehypeRaw,
            ] as any
          }
          rehypeReactOptions={{
            components: {
              code: CodeBlock,
            },
          }}
        >
          {post.content}
        </Remark>
      </div>
    </article>
  );
}

type PostCoverImageProps = {
  coverImage?: string;
  coverImageCaption?: string;
};

function PostCoverImage({ coverImage, coverImageCaption }: PostCoverImageProps) {
  if (!coverImage) {
    return null;
  }
  return (
    <div className={styles.postCoverImage}>
      <div className={styles.postCoverImageWrapper}>
        <Image
          loader={() => coverImage}
          unoptimized
          src={coverImage}
          alt={coverImageCaption || ''}
          priority
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      {coverImageCaption && <Remark>{coverImageCaption}</Remark>}
    </div>
  );
}

function LinkIcon() {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
    </svg>
  );
}

type TransformedElement = {
  tagName: string;
  type: string;
  properties: { [key: string]: unknown };
  children: TransformedElement[];
};

function transform(element: JSX.Element): TransformedElement {
  if (typeof element.type === 'function') {
    return transform(element.type());
  }

  const newElement: TransformedElement = {
    tagName: element.type as string,
    type: 'element',
    properties: {},
    children: [],
  };
  if (element.props) {
    Object.entries(element.props).forEach(([key, value]) => {
      if (key === 'children') {
        return;
      }
      newElement.properties[key] = value;
    });
    if (element.props.children) {
      if (Array.isArray(element.props.children)) {
        newElement.children = element.props.children.map(transform);
      } else {
        newElement.children.push(transform(element.props.children));
      }
    }
  }
  return newElement;
}
