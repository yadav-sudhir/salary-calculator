import fs from 'fs';
import path from 'path';

const STATES = [
  { slug: 'maharashtra', name: 'Maharashtra' },
  { slug: 'karnataka', name: 'Karnataka' },
  { slug: 'delhi', name: 'Delhi' },
  { slug: 'tamil-nadu', name: 'Tamil Nadu' },
  { slug: 'telangana', name: 'Telangana' },
  { slug: 'gujarati', name: 'Gujarat' },
  { slug: 'haryana', name: 'Haryana' },
  { slug: 'punjab', name: 'Punjab' },
  { slug: 'rajasthan', name: 'Rajasthan' },
  { slug: 'west-bengal', name: 'West Bengal' },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh' },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh' },
  { slug: 'bihar', name: 'Bihar' },
  { slug: 'jharkhand', name: 'Jharkhand' },
  { slug: 'odisha', name: 'Odisha' },
  { slug: 'assam', name: 'Assam' },
  { slug: 'kerala', name: 'Kerala' },
  { slug: 'goa', name: 'Goa' },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh' },
  { slug: 'uttarakhand', name: 'Uttarakhand' },
  { slug: 'chhattisgarh', name: 'Chhattisgarh' },
  { slug: 'manipur', name: 'Manipur' },
  { slug: 'meghalaya', name: 'Meghalaya' },
  { slug: 'mizoram', name: 'Mizoram' },
  { slug: 'nagaland', name: 'Nagaland' },
  { slug: 'sikkim', name: 'Sikkim' },
  { slug: 'tripura', name: 'Tripura' },
  { slug: 'arunachal-pradesh', name: 'Arunachal Pradesh' },
];

const BLOG_POSTS = [
  {
    slug: 'how-to-save-tax-for-salaried-employees-2025-26',
    lastmod: '2026-01-15',
    priority: 0.8,
  },
  {
    slug: 'best-investment-options-for-salaried-employees-2025-26',
    lastmod: '2026-01-14',
    priority: 0.8,
  },
  {
    slug: '8th-pay-commission-salary-calculator-government-employees',
    lastmod: '2026-01-18',
    priority: 0.9,
  },
];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function generateSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Home page
  entries.push({
    loc: 'https://salarycalc.in/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Blog listing page
  entries.push({
    loc: 'https://salarycalc.in/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  });

  // Blog posts
  BLOG_POSTS.forEach((post) => {
    entries.push({
      loc: `https://salarycalc.in/blog/${post.slug}`,
      lastmod: post.lastmod,
      changefreq: 'monthly',
      priority: post.priority,
    });
  });

  // State-specific calculator pages
  STATES.forEach((state) => {
    entries.push({
      loc: `https://salarycalc.in/salary-calculator/${state.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  // Static pages
  entries.push(
    {
      loc: 'https://salarycalc.in/privacy',
      lastmod: '2026-01-01',
      changefreq: 'yearly',
      priority: 0.5,
    },
    {
      loc: 'https://salarycalc.in/terms',
      lastmod: '2026-01-01',
      changefreq: 'yearly',
      priority: 0.5,
    },
    {
      loc: 'https://salarycalc.in/contact',
      lastmod: '2026-01-01',
      changefreq: 'yearly',
      priority: 0.5,
    }
  );

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach((entry) => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'client', 'public', 'sitemap.xml');

try {
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`📊 Total URLs: ${sitemap.match(/<url>/g)?.length || 0}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}

export default generateSitemap;
