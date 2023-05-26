import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';

interface ToolsProps {}

export default function Tools({}: ToolsProps) {
  return (
    <SiteLayout>
      <Link href="/tools/style-translate" passHref>
        Styles
      </Link>
    </SiteLayout>
  );
}
