import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', /* Protect internal admin panel */
        '/api/',
        '/studio/', /* Sanity CMS Studio path */
      ],
    },
    sitemap: 'https://www.alphadigify.com/sitemap.xml',
  };
}
