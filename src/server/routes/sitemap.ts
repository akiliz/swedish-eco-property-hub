
import { Router } from 'express';
import { Property } from '../models/Property';

const router = Router();
const BASE_URL = process.env.BASE_URL || 'https://swedish-eco-property.com';

router.get('/sitemap.xml', async (_, res) => {
  const properties = await Property.find({}, 'slug updatedAt');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${BASE_URL}/properties</loc>
        <priority>0.9</priority>
      </url>
      ${properties.map(property => `
        <url>
          <loc>${BASE_URL}/properties/${property.slug}</loc>
          <lastmod>${property.updatedAt.toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

export default router;
