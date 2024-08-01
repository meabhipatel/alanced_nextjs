import { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/`,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/search-freelancer`,
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/search-job`,
      priority: 0.89,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/why-alanced`,
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/about-us`,
      priority: 0.79,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/contact-us`,
      priority: 0.78,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/safety-security`,
      priority: 0.77,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/enterprises`,
      priority: 0.76,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/faq`,
      priority: 0.75,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/terms`,
      priority: 0.75,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/privacy-policy`,
      priority: 0.75,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/cookies`,
      priority: 0.75,
    },
  ];
};

export default sitemap;
