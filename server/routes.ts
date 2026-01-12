import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url );
const __dirname = path.dirname(__filename);

export async function registerRoutes(
  httpServer: Server,
  app: Express
 ): Promise<Server> {
  
  app.post("/api/posts", async (req, res) => {
    const { title, slug, excerpt, content, password } = req.body;

    // Basic security check
    if (password !== "admin123") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const postsPath = path.resolve(__dirname, "../client/src/posts.json");
      const sitemapPath = path.resolve(__dirname, "../client/public/sitemap.xml");

      // 1. Update posts.json
      const postsData = await fs.readFile(postsPath, "utf-8");
      const posts = JSON.parse(postsData);
      
      const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1,
        title,
        slug,
        excerpt,
        content,
        date: new Date().toISOString().split("T")[0]
      };

      posts.push(newPost);
      await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

      // 2. Update sitemap.xml
      let sitemapContent = await fs.readFile(sitemapPath, "utf-8");
      const newUrlEntry = `
  <url>
    <loc>https://salarycalc.in/blog/${slug}</loc>
    <lastmod>${newPost.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

      sitemapContent = sitemapContent.replace("</urlset>", newUrlEntry );
      await fs.writeFile(sitemapPath, sitemapContent);

      res.status(200).json({ message: "Post saved and sitemap updated" });
    } catch (error) {
      console.error("Error saving post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
