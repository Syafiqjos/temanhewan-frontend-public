import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraph } from '@/lib/helper';

// !STARTERCONF Change these default meta
const defaultMeta = {
  title: 'Next.js + Tailwind CSS + TypeScript Starter',
  siteName: 'Next.js + Tailwind CSS + TypeScript Starter',
  description:
    'A starter for Next.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://tsnext-tw.thcl.dev',
  type: 'website',
  robots: 'follow, index',
  /** No need to be filled, will be populated with openGraph function */
  image: '',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta['image'] = openGraph({
    description: meta.description,
    siteName: props.templateTitle ? meta.siteName : meta.title,
    templateTitle: props.templateTitle,
  });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Theodorus Clarence'
          />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

// !STARTERCONF this is the default favicon, you can generate your own from https://www.favicon-generator.org/ then replace the whole /public/favicon folder
const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '16x16',
    href: '/favicon/logo-16x16.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '24x24',
    href: '/favicon/logo-24x24.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '32x32',
    href: '/favicon/logo-32x32.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '48x48',
    href: '/favicon/logo-48x48.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '128x128',
    href: '/favicon/logo-128x128.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '256x256',
    href: '/favicon/logo-256x256.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '256x256',
    href: '/favicon/logo-256x256.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/logo-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '24x24',
    href: '/favicon/logo-24x24.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/logo-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '48x48',
    href: '/favicon/logo-48x48.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '128x128',
    href: '/favicon/logo-128x128.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/manifest.json',
  },
];
