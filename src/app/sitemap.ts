import { MetadataRoute } from "next";
import blogsData from "@/data/blogs.json"; // Assuming blogs data is structurally accessible

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://freshpod.in";

    // Base routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/distributors`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/calculator`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // Dynamic Blog Routes
    const blogRoutes: MetadataRoute.Sitemap = blogsData.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.publishedAt),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...routes, ...blogRoutes];
}
