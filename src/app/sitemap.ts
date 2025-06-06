import { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}

export default sitemap;
