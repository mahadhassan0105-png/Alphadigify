import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alphadigify.com';

  const services = [
    'amazon-account-management',
    'tiktok-shop',
    'social-media-management',
    'web-seo-optimization',
    'google-ads-management',
    'website-development',
    'graphic-design',
    'video-ads-creation',
    'account-reinstatement',
    'ai-solutions-automation'
  ];

  const mainPages = [
    { url: `${baseUrl}`, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/case-studies`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const servicePages = services.map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allPages = [
    ...mainPages.map(page => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...servicePages
  ];

  return allPages;
}
