/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, PlayCircle, ShieldCheck, PenTool, ShoppingCart, MousePointerClick, Globe, Package, LayoutDashboard, Settings, BarChart3, ClipboardCheck, Truck, Edit3 } from 'lucide-react';
import Image from 'next/image';

interface ServiceBlock {
  heading?: string;
  items: {
    title: string;
    text: string;
  }[];
}

interface DetailedService {
  id: string;
  title: string;
  image: string;
  intro: string;
  blocks: ServiceBlock[];
  videoNote?: string;
  certification?: string;
}

const tiktokDetailedServices: DetailedService[] = [
  {
    id: "affiliate",
    title: "TikTok Affiliate Networking",
    image: "/tiktok_bg_1.jpg",
    intro: "Creators are the engine of TikTok Shop. We leverage our proprietary matchmaking system to connect your brand with thousands of top-performing TikTok creators who genuinely align with your products, driving authentic virality and massive organic sales.",
    blocks: [
      {
        heading: "Full-Cycle Creator Management",
        items: [
          { title: "Creator Discovery", text: "Targeted outreach to creators in your exact niche." },
          { title: "Sample Fulfillment", text: "Automated logistics for sending free product samples." },
          { title: "Performance Tracking", text: "Monitoring ROI and commission structures for every creator." }
        ]
      }
    ],
    videoNote: "Watch how we scaled a beauty brand to $1M/month solely through targeted creator seeding.",
    certification: "TikTok Shop Certified Partner",
  },
  {
    id: "live",
    title: "Live Stream Commerce",
    image: "/images/tiktok-bg.png",
    intro: "Live shopping is the highest-converting format on TikTok. Our in-house production team handles everything from scriptwriting and set design to professional hosting and real-time sales optimization during your broadcasts.",
    blocks: [
      {
        heading: "End-to-End Live Production",
        items: [
          { title: "Professional Studios", text: "Access to our fully equipped live streaming spaces." },
          { title: "Expert Hosts", text: "Trained live-commerce presenters who know how to sell." },
          { title: "Real-Time Moderation", text: "Managing chat, pinning products, and driving flash sales." }
        ]
      }
    ]
  },
  {
    id: "content",
    title: "Viral Content Creation",
    image: "/tiktok_bg_2.jpg",
    intro: "You can't sell on TikTok with boring corporate ads. Our creative team produces high-velocity, trend-native short-form video content designed specifically for the For You Page (FYP).",
    blocks: [
      {
        heading: "Trend-Native Production",
        items: [
          { title: "Trend Analysis", text: "Capitalizing on trending audio and formats instantly." },
          { title: "UGC Style", text: "Creating raw, authentic user-generated style content." },
          { title: "A/B Testing", text: "Rapidly testing different hooks to find winning creatives." }
        ]
      }
    ]
  },
  {
    id: "ads",
    title: "TikTok Ads & Spark Ads",
    image: "/images/ai-hero-bg.png",
    intro: "We amplify your best-performing organic and creator content using Spark Ads. By putting paid media behind proven viral videos, we guarantee massive scale and a highly profitable ROAS.",
    blocks: [
      {
        heading: "Strategic Amplification",
        items: [
          { title: "Spark Ads", text: "Boosting creator content directly from their profiles." },
          { title: "Shop Ads", text: "Direct-to-purchase ad formats optimizing for GMV." },
          { title: "Retargeting", text: "Capturing abandoned carts and high-intent viewers." }
        ]
      }
    ]
  }
];

const detailedServices: DetailedService[] = [
  {
    id: "ppc",
    title: "Amazon PPC Management",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    intro: "Our PPC management involves a series of techniques combined with advanced macros to optimize current advertising efforts. We’ll update your advertising faster, more frequently, and more holistically. In addition, we store bid adjustments for your viewing pleasure at any time. Everything we do prioritizes transparency.",
    blocks: [
      {
        heading: "Top-Tier Expertise",
        items: [
          { title: "Accredited & Certified", text: "Benefit from our Sponsored Ads and DSP certifications." },
          { title: "Ahead of the Curve", text: "We deploy new ad types before they’re publicly available." }
        ]
      },
      {
        heading: "Effective Campaign Management",
        items: [
          { title: "Custom Strategies", text: "Tailored campaigns to target all potential customers." },
          { title: "Advanced Optimization", text: "Cutting-edge techniques and regular updates for peak performance." },
          { title: "Full Transparency", text: "Access bid adjustments and detailed performance insights anytime." }
        ]
      }
    ],
    videoNote: "Follow Steven Pope as he goes through every advertising type and shows how to set up effective PPC campaigns.",
    certification: "Amazon Ads Certified Amazon Full Service Agency",
  },
  {
    id: "seo",
    title: "Amazon SEO",
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop",
    intro: "With years of knowledge and experience behind us, SEO has become second nature to us. We’ve unearthed the ins and outs when it comes to selecting and implementing keywords for your product listings. Our best-in-class 4-phase SEO plan will help your products rank on the first page and sell in just a few clicks.",
    blocks: [
      {
        heading: "Proven Expertise",
        items: [
          { title: "Years of Experience", text: "Our deep knowledge turns Amazon SEO into a science." },
          { title: "4-Phase SEO Plan", text: "A strategic approach to push your products to the first page." }
        ]
      },
      {
        heading: "Comprehensive SEO Services",
        items: [
          { title: "Keyword & Competitor Research", text: "Identify the best keywords and understand your competition." },
          { title: "Targeted Keyword Selection", text: "Choose the most effective keywords for optimal results." },
          { title: "Ongoing Rank Tracking", text: "Monitor keyword performance to ensure continuous improvement." }
        ]
      }
    ],
    videoNote: "Learn from Steven Pope himself in this in-depth Amazon SEO Masterclass.",
  },
  {
    id: "design",
    title: "Amazon Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    intro: "Stunning visuals to help increase click-through rates, drive conversions, and stand out from all the competition. Quality content has been proven to catch the attention of customers, always.\n\nWith hundreds of copy projects under our belts, we know what it takes to create and publish gold standard content.",
    blocks: [
      {
        items: [
          { title: "Enhanced Brand Content (A+)", text: "Drive conversions with engaging A+ content that highlights product appeal, tells your brand story, and significantly increases conversion rates across your entire catalog." },
          { title: "Main Image CTR Hack", text: "Increase clicks instantly with optimized, pattern-interrupting main images. We utilize visual psychology to guarantee a higher Click-Through-Rate against your competitors." },
          { title: "Brand Storefronts", text: "Showcase your entire product range in a custom-built, immersive shopping environment that acts as a standalone website inside of Amazon, building deep brand loyalty." },
          { title: "Infographic Listing Images", text: "We create professional, infographic-style listing images that visually answer customer questions before they even ask, drastically reducing return rates." },
          { title: "Brand Story Modules", text: "Connect deeply with your audience. We build out the Amazon Brand Story module to communicate your heritage, values, and mission to build trust." }
        ]
      }
    ],
    certification: "Pickfu Certified Amazon Full Service Agency",
  },
  {
    id: "merchandising",
    title: "Amazon Merchandising",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    intro: "Our expert catalog management includes a comprehensive approach to elevating your Amazon business.",
    blocks: [
      {
        heading: "Listing Optimization",
        items: [
          { title: "Listing Enhancements", text: "Improve product listings, images, and attributes to captivate customers." },
          { title: "Dynamic Pricing", text: "Adjust prices strategically to stay competitive and boost sales." },
          { title: "Search Query Performance", text: "Leverage detailed dashboards to refine keywords and performance." }
        ]
      },
      {
        heading: "Effective Promotion Strategies",
        items: [
          { title: "Price Discounts & Coupons", text: "Drive sales with targeted discounts and reorder incentives." },
          { title: "Virtual Bundles", text: "Create attractive bundles to increase average order value." },
          { title: "Brand Story Integration", text: "Engage customers by showcasing your brand’s unique story." }
        ]
      },
      {
        heading: "Advanced Management Techniques",
        items: [
          { title: "Competitor Analysis", text: "Stay ahead with regular checks and insights using advanced tools" },
          { title: "Inventory Management", text: "Use dashboards to track stock levels and prevent lost sales." },
          { title: "A/B Testing & Split Campaigns", text: "Optimize ad campaigns with rigorous testing and targeted focus." }
        ]
      },
      {
        heading: "Strategic Insights and Tools",
        items: [
          { title: "Market Basket Analysis", text: "Utilize data to optimize listings and promotions for peak times like Prime Day." },
          { title: "FBA Recommendations", text: "Get advice on low-cost FBA options and product launches." },
          { title: "Performance Tracking", text: "Monitor and adjust campaigns for maximum impact and reduced wasted spend." }
        ]
      }
    ]
  },
  {
    id: "catalog-troubleshooting",
    title: "Catalog Troubleshooting",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    intro: "Amazon can be complicated to navigate, even for seasoned sellers. Add in policy updates and notoriously bad seller support, and it can get troublesome quickly. With over five years of troubleshooting experience, we’re confident we can help.",
    blocks: [
      {
        heading: "Issues We Resolve",
        items: [
          { title: "Price Strategy", text: "There are a variety of pricing strategies that can be used to attract customers, increase sales, and maintain competitiveness." },
          { title: "UPC to GS1 Barcode Changes", text: "We’ll update these for you to become compliant and prevent your listings from disappearing." },
          { title: "Negative Seller Feedback", text: "Once a single-star review hits your account, we’ll do our best to attempt to remove it." },
          { title: "Listing Reinstatement", text: "We have years of experience with reinstating listings on Amazon. We know how to construct and submit an effective Plan of Action." },
          { title: "Parentages", text: "We connect variations such as color or size to the same listing. We can set up your parentages correctly." },
          { title: "New Product Creation", text: "With your very own Amazon specialist, you can free up time while we handle approvals and documentation." },
          { title: "Listing Errors and Issues", text: "We know how to fix virtually any error on Seller Central – from a broken categorization to image bugs." },
          { title: "Brand Name Changes", text: "We know how to deal with tricky brand name changes and brand node issues, so you can get peace of mind." },
          { title: "Other Amazon Issues", text: "With over 400 clients currently managed, we handle various troubleshooting issues regularly." }
        ]
      }
    ]
  },
  {
    id: "main-image-hack",
    title: "Main Image Optimized for Amazon CTR",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
    intro: "Ever wonder why some products effortlessly attract clicks while yours struggle to get noticed? Low Amazon CTR can lead to stagnant sales and missed opportunities.\n\nYour main image is crucial for attracting potential customers. It’s the first point of contact between the customer and the product.",
    blocks: [
      {
        heading: "What We Deliver",
        items: [
          { title: "Amazon-Compliant Images", text: "We create JPEG/PNG images (1600×1600 minimum) that comply with Amazon’s requirements while capturing attention." },
          { title: "Captivate More Customers", text: "A well-designed Amazon main image is the key to increasing clicks and driving sales." }
        ]
      },
      {
        heading: "We find the missing piece",
        items: [
          { title: "Keyword Clarity", text: "Clear product name with a subtle overlay." },
          { title: "Packaging Visibility", text: "Highlight missing packaging." },
          { title: "Human Touch", text: "Add a model to connect with the audience." },
          { title: "Visual Appeal", text: "Enhance color, show accessories, spotlight key ingredients, and more." }
        ]
      }
    ],
    videoNote: "See the Main Image CTR hack in action in this video where Steven Pope breaks down the ways it’s done."
  },
  {
    id: "platform-management",
    title: "Amazon Platform Management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    intro: "Let us handle the complexities of your Amazon Seller Central account, so you can focus on growing your business. Changes happen everyday, and it can be overwhelming to keep up all that information on your own.",
    blocks: [
      {
        heading: "Account Health & Monitoring",
        items: [
          { title: "Constant Monitoring", text: "We keep a vigilant eye on your account to catch and resolve issues before they escalate." },
          { title: "Swift Response", text: "Our team acts quickly to maintain a healthy store and prevent disruptions." }
        ]
      },
      {
        heading: "Data-Driven Insights",
        items: [
          { title: "Targeted Audience", text: "Ensure your products reach the right customers." },
          { title: "Performance Evaluation", text: "Understand what’s working and where improvements are needed." }
        ]
      },
      {
        heading: "Weekly Account Health Checks",
        items: [
          { title: "Detailed Process", text: "From stranded inventory to pricing health, we cover every critical aspect." },
          { title: "Prompt Issue Resolution", text: "We address problems immediately to keep your account in top shape." }
        ]
      },
      {
        heading: "Comprehensive Support",
        items: [
          { title: "Listing Optimization", text: "Improve visibility and sales with optimized listings." },
          { title: "Inventory Management", text: "Avoid stockouts and overstocking with smart inventory control." },
          { title: "Advertising Management", text: "Maximize ROI with expertly managed ad campaigns." },
          { title: "Policy Compliance", text: "Stay compliant with Amazon’s rules to avoid penalties." }
        ]
      }
    ]
  },
  {
    id: "reporting-monitoring",
    title: "Reporting and Monitoring",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    intro: "Weekly reporting so you know how your traffic and conversion rates are growing market share.",
    blocks: [
      {
        items: [
          { title: "Monitoring", text: "We continuously keep an eye out for stranded inventory, hijacker alerts, and issues related to Account Health Management to avoid interruptions and make sure our strategies are effective and avoid setbacks." }
        ]
      }
    ]
  },
  {
    id: "account-audit",
    title: "Seller Central Account Audit",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    intro: "Do you know your strengths and weaknesses and how they compare to competitors? Let our Amazon experts uncover the hidden potential in your Amazon account.",
    blocks: [
      {
        heading: "What we evaluate",
        items: [
          { title: "Advertising", text: "Segmentation, structure, and bidding." },
          { title: "SEO", text: "Indexing and rankings." },
          { title: "Product Listings", text: "Merchandising and design." },
          { title: "Amazon Brand Registry", text: "Ensure your brand is protected." },
          { title: "Account Health", text: "Identify and address risks." },
          { title: "Growth Areas", text: "Pinpoint opportunities for expansion." },
          { title: "Logistics", text: "Review IPI scores for optimal inventory management." },
          { title: "International Expansion", text: "Assess readiness for global growth." },
          { title: "Customer Service", text: "Improve response times and satisfaction." }
        ]
      },
      {
        heading: "Why Choose Us?",
        items: [
          { title: "In-Depth Analysis", text: "Comprehensive review of all aspects of your Amazon business." },
          { title: "75-Point Audit", text: "A detailed and personalized report highlighting key focus areas." },
          { title: "Actionable Insights", text: "Understand the impact of each area and what to prioritize for growth." }
        ]
      }
    ]
  },
  {
    id: "shipping-plans",
    title: "Amazon Shipping Plans",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    intro: "We’ll create a customized shipping plan that keeps your business running smoothly and ensures timely deliveries to your customers.",
    blocks: [
      {
        heading: "Restock & Limitations",
        items: [
          { title: "Restock Suggestions", text: "Maintain a healthy Inventory Performance Index (IPI) with strategic restock recommendations." },
          { title: "Manage Restock Limitations", text: "Our team expertly handles restock limitations to keep your inventory levels optimized." }
        ]
      },
      {
        heading: "Comprehensive Inventory Management",
        items: [
          { title: "Inventory Removal", text: "Efficient removal of excess inventory from fulfillment centers." },
          { title: "Bin Check Requests", text: "Coordinate with Amazon to ensure accurate inventory records." },
          { title: "FBA Shipment Creation", text: "Streamlined creation of FBA shipments to minimize delays." },
          { title: "FBA Updates", text: "Accurate updates to FBA weight, dimensions, and labeling." },
          { title: "Shipment Reconciliation", text: "Resolve discrepancies and ensure accurate fulfillment." }
        ]
      },
      {
        heading: "Why Choose Us?",
        items: [
          { title: "Seamless Process", text: "We manage every step of your shipping and inventory process." },
          { title: "Expert Guidance", text: "Keep your inventory in check and avoid Amazon penalties." },
          { title: "Proven Success", text: "Our strategies ensure smooth operations and satisfied customers." }
        ]
      }
    ]
  },
  {
    id: "copywriting",
    title: "Copywriting for Amazon Listings",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop",
    intro: "Transform your Amazon listings with expert copywriting. Good copywriting involves crafting compelling and persuasive product descriptions that highlight the features and benefits of a product to potential customers.",
    blocks: [
      {
        heading: "Why Copywriting Matters",
        items: [
          { title: "Compelling Descriptions", text: "Showcase your product’s features and benefits in a way that resonates with customers." },
          { title: "Increased Sales", text: "Persuasive copy that connects with buyers leads to higher conversion rates." },
          { title: "Keyword Optimization", text: "Strategic keyword placement in titles, bullet points, and descriptions ensures higher rankings." }
        ]
      },
      {
        heading: "Our Copywriting Services",
        items: [
          { title: "Keyword-Rich Titles", text: "Create titles that are both attention-grabbing and SEO-friendly." },
          { title: "Engaging Bullet Points", text: "Highlight key product benefits in a concise, persuasive manner." },
          { title: "Detailed Descriptions", text: "Craft informative and appealing product descriptions that paint a vivid picture." },
          { title: "A+ Content", text: "Develop both crawlable and non-crawlable A+ content to enhance your brand story." }
        ]
      }
    ]
  }
];

const getServiceVisualDetails = (id: string, title: string, certification?: string) => {
  switch (id) {
    case 'design':
      return {
        icon: PenTool,
        badgeText: certification || "PickFu Certified",
        heading: "Scroll-stopping visuals that dominate the search results."
      };
    case 'merchandising':
      return {
        icon: ShoppingCart,
        badgeText: certification || "Retail Optimization",
        heading: "Perfect product catalog, optimized listings, and dynamic promotions."
      };
    case 'catalog-troubleshooting':
      return {
        icon: Settings,
        badgeText: certification || "Seller Central Support",
        heading: "Expert catalog troubleshooting to fix critical errors and listing bugs."
      };
    case 'main-image-hack':
      return {
        icon: MousePointerClick,
        badgeText: certification || "CTR Optimization",
        heading: "Main image design optimized for maximum Amazon traffic."
      };
    case 'platform-management':
      return {
        icon: LayoutDashboard,
        badgeText: certification || "Full Account Management",
        heading: "Stress-free selling with 24/7 account monitoring and compliance."
      };
    case 'reporting-monitoring':
      return {
        icon: BarChart3,
        badgeText: certification || "Weekly Reporting",
        heading: "Stay ahead of the game with regular updates and performance tracking."
      };
    case 'account-audit':
      return {
        icon: ClipboardCheck,
        badgeText: certification || "Performance Audit",
        heading: "A deep dive into listing performance to pinpoint growth areas."
      };
    case 'shipping-plans':
      return {
        icon: Truck,
        badgeText: certification || "FBA Optimization",
        heading: "Avoid FBA pitfalls with expert IPI management and shipment planning."
      };
    case 'copywriting':
      return {
        icon: Edit3,
        badgeText: certification || "SEO Copywriting",
        heading: "Persuasive product copywriting that drives search rankings and sales."
      };
    case 'affiliate':
      return {
        icon: Globe,
        badgeText: certification || "TikTok Certified Partner",
        heading: "Connect your brand with thousands of top-performing creators."
      };
    case 'live':
      return {
        icon: PlayCircle,
        badgeText: certification || "Live Commerce",
        heading: "Professional live stream production and real-time sales."
      };
    case 'content':
      return {
        icon: PenTool,
        badgeText: certification || "Viral Creation",
        heading: "High-velocity, trend-native content for the For You Page."
      };
    case 'ads':
      return {
        icon: LayoutDashboard,
        badgeText: certification || "Paid Amplification",
        heading: "Scale your sales with Spark Ads and direct-to-purchase formats."
      };
    default:
      return {
        icon: Package,
        badgeText: certification || "Premium Service",
        heading: `Maximize your performance with professional ${title} strategies.`
      };
  }
};

interface ServiceDetailSectionsProps {
  theme?: 'amazon' | 'tiktok';
  title?: string;
  subtitle?: string;
}

export default function ServiceDetailSections({
  theme = 'amazon',
  title = "Our Core Services in Detail",
  subtitle = "We handle every aspect of your journey, from initial launch to becoming a viral sensation."
}: ServiceDetailSectionsProps) {
  const services = theme === 'tiktok' ? tiktokDetailedServices : detailedServices;

  return (
    <section className="py-24 bg-white dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>

        <div className="space-y-16 lg:space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            {/* ═══ PPC TWO-COLUMN FLAT LAYOUT ═══ */}
            if (service.id === 'ppc') {
              return (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  {/* Section Header */}
                  <motion.div className="mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 sm:mb-6">
                      {service.title}
                    </h2>
                    <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl whitespace-pre-wrap">
                      {service.intro}
                    </div>
                    {'certification' in service && service.certification && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 font-bold rounded-lg mt-5 text-xs sm:text-sm">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                        {service.certification}
                      </div>
                    )}
                  </motion.div>

                  {/* Two-Column Flat Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-8 sm:mb-10">
                    
                    {/* Column 1: Top-Tier Expertise */}
                    <motion.div>
                      {/* Chart Image Area */}
                      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 mb-6 aspect-[16/10] flex flex-col">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Amazon Insights</div>
                        <div className="flex items-center gap-6 mb-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-violet-400 inline-block" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">purchases</span>
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white">3,809</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
                            <span className="text-xs text-slate-500 dark:text-slate-400">total brand purchases</span>
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white">5,381</span>
                          </div>
                        </div>
                        <svg viewBox="0 0 320 100" className="w-full flex-1 min-h-0" preserveAspectRatio="none">
                          {[18, 30, 22, 45, 38, 50, 42, 55, 48, 60, 52, 65].map((h, i) => (
                            <rect key={`bar-${i}`} x={i * 26 + 4} y={100 - h} width={14} height={h} rx={2} className="fill-violet-300/60 dark:fill-violet-500/40" />
                          ))}
                          <polyline
                            points="11,82 37,70 63,75 89,55 115,60 141,48 167,52 193,42 219,45 245,35 271,38 297,30"
                            fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            className="stroke-emerald-500"
                          />
                          {[[11,82],[37,70],[63,75],[89,55],[115,60],[141,48],[167,52],[193,42],[219,45],[245,35],[271,38],[297,30]].map(([cx,cy], i) => (
                            <circle key={`dot-${i}`} cx={cx} cy={cy} r="3" className="fill-emerald-500" />
                          ))}
                        </svg>
                      </div>

                      {/* Text Content */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                        Advanced targeting with AMC
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        We use data-backed decisions to guide smarter ad decisions. With Amazon Marketing Cloud (AMC), we go beyond basic metrics to understand how shoppers engage with your ads to refine ad targeting, and improve conversions.
                      </p>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Reach the right shoppers with precise targeting</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Identify high-intent audiences for higher conversions</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Get funnel insights on what drives purchases</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Track full-path attribution across all ad types</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Optimize budget allocation with real-time data</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Column 2: Effective Campaign Management */}
                    <motion.div>
                      {/* Image Area with Animated Arrows */}
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 group">
                        <Image
                          src="/images/amazon-ppc-sponsored.jpg"
                          alt="Amazon PPC Sponsored Ads"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 90vw, 50vw"
                        />
                        
                        {/* Animated Arrow 1 - pointing at first "Sponsored" label */}
                        <div className="absolute top-[42%] left-[28%] animate-bounce">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                            <path d="M12 2L12 18" stroke="#E77600" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11L12 18L19 11" stroke="#E77600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Animated Arrow 2 - pointing at second "Sponsored" label */}
                        <div className="absolute top-[42%] left-[53%] animate-bounce" style={{ animationDelay: '0.2s' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                            <path d="M12 2L12 18" stroke="#E77600" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11L12 18L19 11" stroke="#E77600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Animated Arrow 3 - pointing at third "Sponsored" label */}
                        <div className="absolute top-[42%] left-[78%] animate-bounce" style={{ animationDelay: '0.4s' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                            <path d="M12 2L12 18" stroke="#E77600" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11L12 18L19 11" stroke="#E77600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Pulsing glow overlay on "Sponsored" areas */}
                        <div className="absolute top-[50%] left-[25%] w-[12%] h-[4%] border-2 border-[#E77600] rounded animate-pulse opacity-70" />
                        <div className="absolute top-[50%] left-[50%] w-[12%] h-[4%] border-2 border-[#E77600] rounded animate-pulse opacity-70" style={{ animationDelay: '0.2s' }} />
                        <div className="absolute top-[50%] left-[75%] w-[12%] h-[4%] border-2 border-[#E77600] rounded animate-pulse opacity-70" style={{ animationDelay: '0.4s' }} />
                      </div>

                      {/* Text Content */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                        {service.blocks[1]?.heading || 'Effective Campaign Management'}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        {service.blocks[1]?.items.map((item: any) => `${item.text}`).join(' ')}
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {service.blocks[1]?.items.map((item: any, iIdx: number) => (
                          <li key={iIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item.title}: {item.text}</span>
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#E77600] hover:text-yellow-500 transition-colors group/link">
                        <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center shrink-0 group-hover/link:bg-yellow-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                        More about Amazon PPC
                      </a>
                    </motion.div>
                  </div>

                  {/* Video Note */}
                  {'videoNote' in service && service.videoNote && (
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4 max-w-3xl">
                      <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0 mt-0.5 sm:mt-1" />
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic">
                        &quot;{service.videoNote}&quot;
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button className="bg-yellow-400 text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20 flex items-center group">
                      Talk to our experts
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            }

            {/* ═══ SEO MULTI-PHASE LAYOUT ═══ */}
            if (service.id === 'seo') {
              return (
                <div key={service.id} id={service.id} className="scroll-mt-20 space-y-12 lg:space-y-16">

                  {/* ── Hero: Title + 4-Phase Overview ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Left: Text */}
                    <motion.div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 sm:mb-6">
                        Amazon SEO
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        With years of knowledge and experience and over 3,000 customers served, Amazon SEO has become second nature to us. Our best-in-class 4-phase SEO plan can help your listing rank better and make it easier for shoppers to find your products on Amazon:
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {["Phase 1: Search term optimization", "Phase 2: Copy and pink keyword update", "Phase 3: Strike zone keywords", "Phase 4: Search query report"].map((phase, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{phase}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-5">
                        * SEO Phases 2, 3, and 4 are available for full service management only.
                      </p>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#E77600] hover:text-yellow-500 transition-colors group/link">
                        <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center shrink-0 group-hover/link:bg-yellow-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                        Contact us to improve your Amazon SEO
                      </a>
                    </motion.div>

                    {/* Right: Amazon Search Screenshot */}
                    <motion.div className="relative">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                        <Image
                          src="/images/amazon-seo-search.jpeg"
                          alt="Amazon SEO Search Results"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 90vw, 50vw"
                        />
                        {/* #1 Badge */}
                        <div className="absolute top-[15%] left-[8%] w-12 h-12 sm:w-14 sm:h-14 bg-[#E77600] rounded-full flex items-center justify-center shadow-xl animate-pulse">
                          <span className="text-white font-black text-xl sm:text-2xl">1</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Divider ── */}
                  <div className="border-t border-slate-200 dark:border-slate-800" />

                  {/* ── Phase 1: Search Term Optimization ── */}
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
                  >
                    {/* Left */}
                    <div>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">SEO Phase 1</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                        Search term optimization
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        <strong>Get expert Search Term Optimization starting at $1,000.</strong> Supercharge your product listings with our Phase 1 Amazon SEO. We&apos;ll optimize back-end search terms to drive more traffic and sales.
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Each order will cover up to 10 ASINs. You&apos;ll also get before and after drafts for your approval.
                      </p>
                    </div>

                    {/* Right */}
                    <div>
                      <ul className="space-y-2.5 mb-8">
                        {[
                          "Keyword and competitor research in your category",
                          "Ranking for keywords organically over time",
                          "Hand selecting the most effective keywords",
                          "Increased visibility for your products, leading to higher sales",
                          "Help your customers to find your product"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20">
                        Get Search Term Optimization
                      </button>
                    </div>
                  </motion.div>

                  {/* ── Phases 2, 3, 4 Grid ── */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

                    {/* Phase 2 */}
                    <motion.div
                      className="pt-4"
                    >
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">SEO Phase 2</span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                        Incremental indexing
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        Optimize your backend search terms for your Amazon listings. Phase 2 of our SEO service offering includes:
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {[
                          "Title and bullets point features adjusted for additional keyword inclusions",
                          "We update for \"pink\" keywords – words already in the title/bullets are removed to make room for additional indexing opportunities in the search term field."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#E77600] hover:text-yellow-500 transition-colors group/link">
                        <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center shrink-0 group-hover/link:bg-yellow-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                        More about SEO Phase 2
                      </a>
                    </motion.div>

                    {/* Phase 3 */}
                    <motion.div
                      className="pt-4"
                    >
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">SEO Phase 3</span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                        Strike zone keywords
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        Optimize your back end search terms for your listings on Amazon. In our Phase 3 of our SEO service, we do the following tasks.
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {[
                          "Keyword & competitor research in your category",
                          "Effectively, hand select the best relevant keywords",
                          "Ranking for keywords organically, overtime",
                          "Increase visibility for your products, leading to higher clicks",
                          "Help your customers to find your product!"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#E77600] hover:text-yellow-500 transition-colors group/link">
                        <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center shrink-0 group-hover/link:bg-yellow-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                        More about SEO Phase 3
                      </a>
                    </motion.div>

                    {/* Phase 4 */}
                    <motion.div
                      className="pt-4"
                    >
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">SEO Phase 4</span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                        Search query report
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        This is the Market Share Indexing phase where it increases market share for top ranking keywords determined by Amazon&apos;s search query report, by inputting these exact match phrases into our SEO strategy. For mature listings already eligible for the phase 3 strikezone strategy.
                      </p>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#E77600] hover:text-yellow-500 transition-colors group/link">
                        <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center shrink-0 group-hover/link:bg-yellow-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                        More about SEO Phase 4
                      </a>
                    </motion.div>
                  </div>

                </div>
              );
            }

            {/* ═══ PREMIUM STICKY TIMELINE LAYOUT ═══ */}
            const visualDetails = getServiceVisualDetails(service.id, service.title, 'certification' in service ? service.certification : undefined);
            const VisualIcon = visualDetails.icon;
            
            const allItems = (service.blocks || []).flatMap((block: any) => 
              (block.items || []).map((item: any, iIdx: number) => ({
                ...item,
                blockHeading: iIdx === 0 ? block.heading : undefined,
              }))
            );

            return (
              <div key={service.id} id={service.id} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start max-w-7xl mx-auto scroll-mt-20">
                
                {/* Sticky Visual Column */}
                <div className={`w-full lg:w-1/2 lg:sticky lg:top-32 relative group ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white font-bold rounded-full text-xs uppercase tracking-widest border border-white/20 mb-4">
                        <VisualIcon className="w-4 h-4 text-yellow-400" /> {visualDetails.badgeText}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {visualDetails.heading}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content / List Column */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  
                  {/* Section Header */}
                  <motion.div 
                    className="mb-10"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 sm:mb-6">
                      {service.title}
                    </h2>
                    <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 whitespace-pre-wrap">
                      {service.intro}
                    </div>
                    {'certification' in service && service.certification && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 font-bold rounded-lg text-xs sm:text-sm">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                        {service.certification}
                      </div>
                    )}
                  </motion.div>

                  {/* Timeline List */}
                  <div className="space-y-10">
                    {allItems.map((item: any, idx: number) => {
                      const isItemFirst = idx === 0;
                      const isItemLast = idx === allItems.length - 1;
                      
                      return (
                        <div 
                          key={idx} 
                          className={`relative pl-8 border-l-2 ${
                            isItemLast 
                              ? 'border-transparent' 
                              : isItemFirst 
                                ? 'border-yellow-400' 
                                : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {/* Node dot */}
                          <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-white dark:bg-[#030712] border-4 ${
                            isItemFirst ? 'border-yellow-400' : 'border-slate-200 dark:border-slate-800'
                          }`} />
                          
                          {/* Block Heading if present */}
                          {item.blockHeading && (
                            <div className="text-xs font-extrabold text-yellow-500 uppercase tracking-widest mb-2">
                              {item.blockHeading}
                            </div>
                          )}
                          
                          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                            {item.title}
                          </h4>
                          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Video Note */}
                  {'videoNote' in service && service.videoNote && (
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 sm:p-5 mt-10 mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4">
                      <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0 mt-0.5 sm:mt-1" />
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic">
                        &quot;{service.videoNote}&quot;
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
                    <button className="bg-yellow-400 text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20 flex items-center group">
                      Talk to our experts
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
