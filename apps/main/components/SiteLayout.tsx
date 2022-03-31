import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './SiteLayout.module.scss';
import { DarkLightThemeToggle } from '@libs/common';

export interface SiteLayoutProps {
  title?: string;
}

const SITE_TITLE = "Sam's Blog";

export default function SiteLayout({ title, children }: PropsWithChildren<SiteLayoutProps>) {
  return (
    <div className={styles.siteContainer}>
      <div className="float-right">
        <DarkLightThemeToggle />
      </div>
      <Head>
        <title>{title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
      </Head>
      <div className={styles.header}>
        <h1>
          <Link href="/">{SITE_TITLE}</Link>
        </h1>
      </div>
      {children}
    </div>
  );
}
