import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <>
      <Seo title='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout w-100 mt-8 grid min-h-screen grid-cols-1'>
            {/* Hero */}
            <div className='grid grid-cols-2 gap-3 p-4'>
              <div className='flex flex-col gap-10 p-4'>
                <h1 className='text-xxl font-bold'>
                  Kami akan Menjadi{' '}
                  <span className='text-primary-500'>
                    Layanan Grooming
                  </span>{' '}
                  Anda
                </h1>
                <h2 className='text-base font-normal'>
                  Kami pastikan hewan peliharaaan Anda mendapatkan pelayanan
                  terbaik dari TemanHewan.
                </h2>
                <div className='inline-block'>
                  <ButtonLink variant='primary' href='/grooming/search'>
                    Cari Layanan Grooming
                  </ButtonLink>
                </div>
              </div>
              <div className='p-4'>
                <img
                  className='rounded-xl'
                  alt='image-hero'
                  src='/images/cover/homepage-hero.png'
                />
              </div>
            </div>

            {/* Get Started */}
            <div className='bg-white pb-12'>
              <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8'>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                  <span className='block text-primary-500'>
                    Siap untuk Bersih?
                  </span>
                  <span className='block text-3xl font-bold'>
                    Mulai memeriksa kamu bersama layanan grooming kami ( ͡° ͜ʖ ͡°) 
                  </span>
                </h2>
                <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
                  <div className='inline-flex rounded-md shadow'>
                    <ButtonLink variant='primary' href='/'>
                      Mulai
                    </ButtonLink>
                  </div>
                  <div className='ml-3 inline-flex rounded-md shadow'>
                    <ButtonLink variant='outline' href='/'>
                      Pelajari Lebih Lanjut
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
