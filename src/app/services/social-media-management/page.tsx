import { Metadata } from 'next';
import SocialMediaClient from '@/components/services/social-media/SocialMediaClient';

export const metadata: Metadata = {
  title: 'Social Media Management Services | AlphaDigify',
  description: 'Data-driven social media management that turns followers into revenue. Dominate TikTok, Instagram, LinkedIn, and Facebook with viral content strategies.',
  keywords: [
    'social media management agency',
    'TikTok marketing',
    'Instagram growth agency',
    'viral content creation',
    'B2B LinkedIn marketing',
    'social media revenue tracking',
    'AlphaDigify social media'
  ],
  openGraph: {
    title: 'Social Media Management | AlphaDigify',
    description: 'We build cult followings and drive actual revenue via TikTok, Instagram, and LinkedIn.',
    url: 'https://alphadigify.com/services/social-media-management',
    images: [{
      url: '/og-social-media.jpg',
      width: 1200,
      height: 630,
      alt: 'AlphaDigify Social Media Management'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Management | AlphaDigify',
  },
  alternates: {
    canonical: 'https://alphadigify.com/services/social-media-management'
  }
};

export default function SocialMediaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Social Media Management",
    "provider": {
      "@type": "Organization",
      "name": "AlphaDigify",
      "url": "https://alphadigify.com"
    },
    "description": "Full-stack social media management, content creation, and community building focused on ROI.",
    "areaServed": "Worldwide",
    "offers": [
      { "@type": "Offer", "name": "Growth", "price": "997", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Viral", "price": "2497", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Enterprise", "price": "Contact for pricing" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SocialMediaClient />
    </>
  );
}
