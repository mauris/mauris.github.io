import SiteLayout from '@self/components/SiteLayout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <SiteLayout title="404 Not Found">
      <div className="py-24">
        <h1 className="text-2xl md:text-3xl font-normal">The page you&apos;re looking for was not found.</h1>
        <p className="text-neutral-500">
          Try browsing from <Link href="/">Home</Link>.
        </p>
      </div>
    </SiteLayout>
  );
}
