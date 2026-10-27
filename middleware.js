// Vercel Routing Middleware: refuse known website-copier tools (HTTrack and friends).
// This stops their default settings; it cannot stop someone who disguises the tool.
const COPIERS = /httrack|webcopier|offline explorer|teleport ?pro|webzip|webstripper|sitesucker|website extractor|wget|webreaper|getright|backstreet/i;

export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const agent = request.headers.get('user-agent') || '';
  if (!agent || COPIERS.test(agent)) {
    return new Response('Copying this website is not allowed.', {
      status: 403,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
}
