import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

// const footer = [
//   {
//     name: "Layanan",
//     links: [
//       {
//         name: "Konsultasi",
//         url: "/",
//       },
//       {
//         name: "Grooming",
//         url:"/",
//       }
//     ]
//   },
//   {
//     name: "Lainnya",
//     links: [
//       {
//         name: "Forum",
//         url: "/",
//       },
//       {
//         name:"FAQ",
//         url:"/",
//       }
//     ]
//   },
//   {
//     name: "Perusahaan Kami",
//     links: [
//       {
//         name: "Tentang Kami",
//         url: "/",
//       }
//     ]
//   }
// ]

export default function Footer() {
  return (
    <footer className='bg-gray-50'>
      <div className='mx-auto max-w-screen-2xl px-4 py-14 lg:px-24'>
        <div className='grid lg:grid-cols-12'>
          <div className='md:col-span-12 lg:col-span-6'>
            <UnstyledLink
              href='/'
              className='flex font-bold hover:text-gray-600'
            >
              <img alt='logo' className='h-8' src='/images/logo.png' />
              <img
                alt='logo-text'
                className='h-8'
                src='/images/logo-text.png'
              />
            </UnstyledLink>
            <div className='pt-12'>
              <p className='text-light-3 mt-5 text-base font-normal'>
                2022 - All rights reserved.
              </p>
            </div>
          </div>

          <div className='md:col-span-4 lg:col-span-2'>
            <div className='text-light-3 mb-4 text-xl font-bold'>Layanan</div>
            <div className='mb-4'>
              <a
                href=''
                className='text-md text-light-3 font-normal hover:text-primary-500'
              >
                Konsultasi
              </a>
            </div>
            <div className='mb-4'>
              <a
                href=''
                className='text-md text-light-3 font-normal hover:text-primary-500'
              >
                Grooming
              </a>
            </div>
          </div>

          <div className='md:col-span-4 lg:col-span-2'>
            <div className='text-light-3 mb-4 text-xl font-bold'>Lainnya</div>
            <div className='mb-4'>
              <a
                href=''
                className='text-md text-light-3 font-normal hover:text-primary-500'
              >
                Forum
              </a>
            </div>
            <div className='mb-4'>
              <a
                href=''
                className='text-md text-light-3 font-normal hover:text-primary-500'
              >
                FAQ
              </a>
            </div>
          </div>

          <div className='md:col-span-4 lg:col-span-2'>
            <div className=' text-light-3 mb-4 text-xl font-bold hover:text-primary-500'>
              Perusahaan Kami
            </div>
            <div className='mb-4'>
              <a
                href=''
                className='text-md text-light-3 font-normal hover:text-primary-500'
              >
                Tentang Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
