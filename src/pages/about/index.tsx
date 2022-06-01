import * as React from 'react';

import Seo from '@/components/Seo';

export default function About() {
  return (
    <>
      <Seo title='About Us' />

      <main>
        <section className='bg-white'>
          <div className='layout w-100 mt-8 grid min-h-screen grid-cols-1'>
            {/* Hero */}
            <div className='grid grid-cols-2 gap-3 p-4'>
              <div className='p-4'>
                <img
                  className='rounded-xl'
                  alt='logo-image'
                  src='/images/about.png'
                />
              </div>
              <div className='flex flex-col gap-10 p-4'>
                <h1 className='text-xxl font-normal '>
                  Teman
                  <span className='font-extrabold text-primary-500'>Hewan</span>
                </h1>
                <p className='text-justify text-base font-normal leading-loose'>
                  <span className='font-bold'>TemanHewan </span>dirancang untuk
                  mengatasi permasalahan yang sering dirasakan oleh pemilik
                  hewan peliharaan. Dengan website kami, pemilik hewan dapat
                  melakukan diskusi dan konsultasi dengan memanggil dokter hewan
                  yang profesional dan tersertifikasi ke rumah. Tidak hanya itu,
                  para pemilik hewan juga dapat melakukan grooming di rumah
                  dengan memanggil jasa grooming.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
