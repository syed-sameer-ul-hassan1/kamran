import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GUIDES } from '../data/guidesData';

const BASE_SEO_MAP = {
  '/': {
    title: 'Kamran Shawls | Best Authentic Pashmina, Pure Shatoosh & Swati Wool Shawls in Pakistan',
    description: "Kamran Shawls Nathia Gali — Pakistan's premier boutique for authentic 100% pure Himalayan Pashmina shawls, royal Shatoosh, Swati handloom wool chadars, and Kashmiri embroidered wraps. Tracked nationwide delivery & live video inspection.",
    canonical: 'https://kamranshawls.com.pk/',
  },
  '/collection': {
    title: 'Shop Authentic Mountain Shawls & Wraps | Kamran Shawls Catalogue',
    description: 'Browse our complete curated collection of authentic Himalayan Pashmina, Royal Shatoosh, Swati Wool Chadars, and Kashmiri Sozni Stoles. Live video inspection before COD dispatch.',
    canonical: 'https://kamranshawls.com.pk/collection',
  },
  '/craft': {
    title: 'Artisan Heritage & 6-Stage Handloom Craftsmanship | Kamran Shawls',
    description: 'Discover how raw Himalayan cashmere and Swati wool fleeces are hand-spun on traditional charkhas and hand-woven on wooden pit looms. Handloom vs Powerloom authenticity standards.',
    canonical: 'https://kamranshawls.com.pk/craft',
  },
  '/contact': {
    title: 'Direct Atelier Consultation & Store Coordinates | Kamran Shawls Nathia Gali',
    description: 'Connect directly with our curators in Nathia Gali for live video demonstrations, bespoke bridal color matching, and worldwide express tracked delivery.',
    canonical: 'https://kamranshawls.com.pk/contact',
  },
  '/guides': {
    title: 'Weave Knowledge & Authenticity Guides | Kamran Shawls Nathia Gali',
    description: 'Explore comprehensive expert guides on verifying pure Himalayan Pashmina, understanding shatoosh ring tests, and draping traditional Swati wool chadars.',
    canonical: 'https://kamranshawls.com.pk/guides',
  }
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    let currentSeo = BASE_SEO_MAP[location.pathname];

    if (!currentSeo && location.pathname.startsWith('/guides/')) {
      const slug = location.pathname.replace('/guides/', '');
      const guide = GUIDES.find((g) => g.slug === slug);
      if (guide) {
        currentSeo = {
          title: `${guide.title} | Kamran Shawls`,
          description: guide.summary,
          canonical: `https://kamranshawls.com.pk/guides/${guide.slug}`,
        };
      }
    }

    if (!currentSeo) {
      currentSeo = BASE_SEO_MAP['/'];
    }
    
    document.title = currentSeo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.description);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentSeo.canonical);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentSeo.canonical);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.description);
  }, [location.pathname]);

  return null;
}
