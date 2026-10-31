import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** A link that opens in a new tab, marked with an arrow. */
export default function ExternalLink({
  href,
  className,
  children,
}: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
