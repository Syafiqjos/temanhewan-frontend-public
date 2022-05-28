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

const layanan = [
  {
    name: 'Konsultasi Dokter Hewan',
    description:
      'Anda dapat melakukan konsultasi kondisi hewan peliharaan dengan dokter hewan melalui chat',
    icon: '/favicon/consultation.png',
  },
  {
    name: 'Profil Hewan Peliharaan',
    description:
      'Data hewan dapat disimpan untuk memudahkan konsultasi, grooming, ataupun berdiskusi di forum',
    icon: '/favicon/pet.png',
  },
  {
    name: 'Forum Diskusi',
    description:
      'Anda dapat bertanya berbagai hal yang berkaitan dengan hewan peliharaan',
    icon: '/favicon/forum.png',
  },
  {
    name: 'Grooming',
    description:
      'Anda dengan mudah memesan jasa grooming untuk hewan peliharaan',
    icon: '/favicon/grooming.png',
  },
];

const benefit = [
  {
    name: 'Pelayanan Terbaik',
    number: '1',
    description:
      'Kami menjamin layanan yang kami berikan sesuai ekspektasi Anda',
  },
  {
    name: 'Harga Terjangkau',
    number: '2',
    description: 'Harga yang kami tawarkan tidak akan memberatkan Anda',
  },
  {
    name: 'Dijawab oleh Ahlinya',
    number: '3',
    description:
      'Pertanyaan Anda di forum dijawab oleh dokter yang ahli di bidangnya',
  },
];

export default function HomePage() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout w-100 mt-8 grid min-h-screen grid-cols-1'>
            {/* Hero */}
            <div className='grid grid-cols-2 gap-3 p-4'>
              <div className='flex flex-col gap-10 p-4'>
                <h1 className='text-xxl font-bold'>
                  Kami akan Menjadi{' '}
                  <span className='text-primary-500'>
                    Teman Hewan Peliharaan
                  </span>{' '}
                  Anda
                </h1>
                <h2 className='text-base font-normal'>
                  Kami pastikan hewan peliharaaan Anda mendapatkan pelayanan
                  terbaik dari TemanHewan.
                </h2>
                <div className='inline-block'>
                  <ButtonLink variant='primary' href='/'>
                    Mulai
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

            {/* Layanan */}
            <div className='bg-white py-12'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='lg:text-center'>
                  <h2 className='text-base font-semibold uppercase tracking-wide text-primary-500'>
                    Layanan
                  </h2>
                  <p className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                    Pelayanan yang kami miliki
                  </p>
                  <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
                    Kami menyediakan layanan konsultasi hewan peliharaan yang
                    terbaik. Selain itu, juga terdapat forum diskusi dan
                    pemesanan grooming.
                  </p>
                </div>

                <div className='mt-10'>
                  <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0'>
                    {layanan.map((feature) => (
                      <div key={feature.name} className='relative'>
                        <dt>
                          <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-white'>
                            <img
                              src={feature.icon}
                              alt='feature-icon'
                              className='h-6 w-6'
                            />
                          </div>
                          <p className='ml-16 text-lg font-medium leading-6 text-gray-900'>
                            {feature.name}
                          </p>
                        </dt>
                        <dd className='mt-2 ml-16 text-base text-gray-500'>
                          {feature.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Benefit */}
            <div className='content-3-2 flex flex-col items-center py-12 lg:flex-row'>
              {/* <!-- Left Column --> */}
              <div className='mb-12 flex w-full justify-center text-center lg:mb-0 lg:w-1/2'>
                <img
                  id='benefit'
                  src='/images/cover/homepage-benefit.png'
                  alt='homepage-benefit'
                />
              </div>
              {/* <!-- Right Column --> */}
              <div className='flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left'>
                <h2 className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                  Benefit <span className='text-primary-500'>TemanHewan</span>
                </h2>
                <ul className='pt-10'>
                  {benefit.map((feature) => (
                    <li key={feature.name} className='mb-8'>
                      <h4 className='text-medium-black mb-5 flex flex-col items-center justify-center text-2xl font-medium lg:flex-row lg:justify-start'>
                        <span className='circle mb-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-xl text-white lg:mr-5 lg:mb-0'>
                          {feature.number}
                        </span>
                        {feature.name}
                      </h4>
                      <p className='caption text-base leading-7 tracking-wide'>
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get Started */}
            <div className='bg-white pb-12'>
              <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8'>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                  <span className='block text-primary-500'>
                    Siap untuk Berjelajah?
                  </span>
                  <span className='block text-3xl font-bold'>
                    Mulai perjalanan kamu bersama kami
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
