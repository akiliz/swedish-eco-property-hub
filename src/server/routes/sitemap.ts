
import express from 'express';
import { Property } from '../models/Property';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://ecohomesweden.se';
    const properties = await Property.find();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/properties</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      ${properties.map(property => `
        <url>
          <loc>${baseUrl}/properties/${property._id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ error: 'Error generating sitemap' });
  }
});

export default router;
