import SiteLayout from '@self/components/SiteLayout';
import Link from 'next/link';

interface ToolsProps {}

export default function Tools({}: ToolsProps) {
  return (
    <SiteLayout>
      <Link href="/tools/style-translate">Styles</Link>
    </SiteLayout>
  );
}
