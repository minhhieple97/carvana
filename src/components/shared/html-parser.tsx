'use client';
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';
import dynamic from 'next/dynamic';
export const HTMLParser = ({ html }: { html: string }) => parse(sanitizeHtml(html));

const HTMLParserDynamic = dynamic(
  () => import('@/components/shared/html-parser').then((mod) => mod.HTMLParser),
  { ssr: false }
);

export function ClientHTMLParser({ html }: { html: string }) {
  return <HTMLParserDynamic html={html} />;
}
