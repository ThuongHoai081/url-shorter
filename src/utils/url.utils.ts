export function extractDomain(originalUrl: string): string {
  const url = new URL(originalUrl);

  return url.hostname;
}
