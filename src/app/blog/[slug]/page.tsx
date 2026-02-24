import type { Metadata } from "next";
import { notFound } from "next/navigation";
import blogsData from "@/data/blogs.json";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ slug: string }> };

const allBlogs = blogsData as any[];

function getBlogBySlug(slug: string) {
    return allBlogs.find((b) => b.slug === slug) ?? null;
}

export async function generateStaticParams() {
    return allBlogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogBySlug(slug);
    if (!post) return { title: "Blog Post Not Found | FreshPod" };

    const { seo } = post;

    // Build JSON-LD schema array for injection via metadata
    const jsonLd: object[] = [
        {
            "@context": "https://schema.org",
            "@type": seo.schemaType ?? "BlogPosting",
            headline: post.title,
            description: seo.metaDescription,
            image: `https://freshpod.in${seo.ogImage}`,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: post.author, url: "https://freshpod.in" },
            publisher: {
                "@type": "Organization",
                name: "FreshPod",
                logo: { "@type": "ImageObject", url: "https://freshpod.in/images/GOGO.png" },
            },
            keywords: seo.keywords.join(", "),
            url: seo.canonicalUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": seo.canonicalUrl },
            inLanguage: "en-IN",
        },
    ];

    if (seo.aeo?.faqItems?.length) {
        jsonLd.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: seo.aeo.faqItems.map((f: any) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        });
    }

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: seo.metaTitle,
            description: seo.metaDescription,
            url: seo.canonicalUrl,
            siteName: "Freshpod",
            images: [{ url: `https://freshpod.in${seo.ogImage}`, width: 1200, height: 630 }],
            locale: "en_IN",
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: seo.metaTitle,
            description: seo.metaDescription,
            images: [`https://freshpod.in${seo.ogImage}`],
        },
        alternates: { canonical: seo.canonicalUrl },
        // Inject JSON-LD via metadata other — renders as <meta> tags in <head>
        // We also inject via a script tag in the page body for broad compatibility
        other: {
            "geo.region": `IN-${seo.geo?.region?.substring(0, 2).toUpperCase() ?? "AP"}`,
            "geo.placename": seo.geo?.locality ?? "India",
            "geo.position": "20.5937;78.9629",
            ICBM: "20.5937, 78.9629",
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogBySlug(slug);
    if (!post) notFound();

    // Find adjacent posts for prev/next navigation
    const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
    const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
    const nextPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

    // Build JSON-LD array
    const { seo } = post;
    const jsonLd: object[] = [
        {
            "@context": "https://schema.org",
            "@type": seo.schemaType ?? "BlogPosting",
            headline: post.title,
            description: seo.metaDescription,
            image: `https://freshpod.in${seo.ogImage}`,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: post.author, url: "https://freshpod.in" },
            publisher: {
                "@type": "Organization",
                name: "FreshPod",
                logo: { "@type": "ImageObject", url: "https://freshpod.in/images/GOGO.png" },
            },
            keywords: seo.keywords.join(", "),
            url: seo.canonicalUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": seo.canonicalUrl },
            inLanguage: "en-IN",
            locationCreated: {
                "@type": "Place",
                name: seo.geo?.locality ?? "India",
                address: {
                    "@type": "PostalAddress",
                    addressCountry: "IN",
                    addressRegion: seo.geo?.region ?? "Andhra Pradesh",
                },
            },
        },
    ];

    if (seo.aeo?.faqItems?.length) {
        jsonLd.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: seo.aeo.faqItems.map((f: any) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        });
    }

    const clientProps: { post: any; prevPost: any; nextPost: any } = { post, prevPost, nextPost };

    return (
        <>
            {/* JSON-LD in body for broad crawler compatibility */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient {...clientProps} />
        </>
    );
}
