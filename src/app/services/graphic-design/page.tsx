import { Metadata } from 'next';
import GraphicDesignClient from '@/components/services/graphic-design/GraphicDesignClient';

export const metadata: Metadata = {
  title: 'Graphic Design & Video Editing Services | AlphaDigify',
  description: 'Professional graphic design services for Amazon sellers and brands — logo design, A+ content, social media graphics, packaging, and video editing. 500+ designs delivered. Source files always included. From $149.',
  keywords: [
    'graphic design for Amazon',
    'Amazon A+ content design',
    'brand identity design Pakistan',
    'social media graphics service',
    'video editing service',
    'Amazon brand story design',
    'AlphaDigify design'
  ],
  openGraph: {
    title: 'Graphic Design & Video Editing | AlphaDigify',
    description: 'Professional design for Amazon sellers and brands',
    url: 'https://alphadigify.com/services/graphic-design',
    images: [{
      url: '/og-graphic-design.jpg',
      width: 1200,
      height: 630,
      alt: 'AlphaDigify Graphic Design Services'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design & Video Editing | AlphaDigify',
  },
  alternates: {
    canonical: 'https://alphadigify.com/services/graphic-design'
  }
};

export default function GraphicDesignPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Graphic Design & Video Editing",
    "provider": {
      "@type": "Organization",
      "name": "AlphaDigify",
      "url": "https://alphadigify.com"
    },
    "description": "Professional graphic design and video editing services for Amazon sellers and brands worldwide.",
    "areaServed": "Worldwide",
    "offers": [
      { "@type": "Offer", "name": "Starter", "price": "149", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Professional", "price": "397", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Enterprise", "price": "Contact for pricing" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What design services does AlphaDigify offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a full suite of graphic design and video editing services including logo and brand identity design, Amazon A+ content, Brand Story, social media graphics, product packaging, Amazon storefronts, infographics, and video editing."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a design project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turnaround time depends on the service: Logo design takes 3–5 business days, social media graphics 2–3 days, Amazon A+ Content 4–6 days, and brand identity packages 5–7 days. Rush delivery is available on request."
        }
      },
      {
        "@type": "Question",
        "name": "Will I receive the source files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — always. Every project includes full source files (PSD, AI, Figma, or MP4 for video). You own everything we create. Files are delivered via Google Drive or Dropbox within 24 hours of final approval."
        }
      },
      {
        "@type": "Question",
        "name": "How many revisions are included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All packages include a minimum of 2 full revision rounds. The Professional and Enterprise packages include 3 rounds. Additional revisions beyond the included rounds are available at a small extra fee."
        }
      },
      {
        "@type": "Question",
        "name": "Do you design for platforms other than Amazon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We design for all major platforms including Instagram, Facebook, TikTok, LinkedIn, Shopify, WordPress, and any other platform you sell or market on."
        }
      },
      {
        "@type": "Question",
        "name": "Can you match our existing brand guidelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If you already have brand guidelines, simply share them and we will match your fonts, colors, and style exactly. If you don't have guidelines yet, we can create them for you."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer ongoing monthly design packages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — our Enterprise package is a monthly retainer that includes unlimited design requests, social media graphics, Amazon content updates, and video editing. Contact us for custom pricing."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats do you deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We deliver in all standard formats: PNG (transparent), JPG, PDF (print-ready), AI (Adobe Illustrator), PSD (Photoshop), Figma files, and MP4/MOV for video. Just tell us what you need."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GraphicDesignClient />
    </>
  );
}
