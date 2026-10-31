/** Resolves a path under `public/` against Vite's base, which may be a subpath. */
export function toPublicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
