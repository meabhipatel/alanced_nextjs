import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/freelancer/", "/hirer/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/sitemap.xml`,
  };
};

export default robots;
