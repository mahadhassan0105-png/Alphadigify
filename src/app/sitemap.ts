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
    'ai-solutions-automation',
    'reviews-management',
  ];

  const mainPages = [
    { url: `${baseUrl}`, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/case-studies`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/articles`, changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const servicePages = services.map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articleSlugs = [
    '6-key-amazon-ppc-launch-metrics-new-sellers-should-watch',
    'amazon-prime-big-deal-days-2026-playbook-for-sellers-preparing-for-q4',
    'smart-amazon-management-to-cut-inbound-defect-fees-and-protect-margins',
    'the-2026-blueprint-to-100-verified-reviews-on-amazon-and-walmart',
    'how-to-recover-a-suspended-amazon-account-appeal-guide',
    'google-ads-performance-max-vs-search-ads-ecommerce',
  ];

  const articlePages = articleSlugs.map(slug => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const allPages = [
    ...mainPages.map(page => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...servicePages,
    ...articlePages,
  ];

  return allPages;
}
