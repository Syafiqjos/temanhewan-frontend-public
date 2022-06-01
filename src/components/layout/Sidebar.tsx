import * as React from 'react';
import 'flowbite';

import UnstyledLink from '../links/UnstyledLink';

const linksProfile = [
  { href: '/dashboard/my-profile', label: 'Profil Saya' },
  { href: '/dashboard/edit-profile', label: 'Edit Profil' },
  { href: '/dashboard/change-password', label: 'Ubah Password' },
];

const linksPet = [
  { href: '/dashboard/my-pet', label: 'Hewan Saya' },
  { href: '/dashboard/add-pet', label: 'Tambah Hewan' },
];

export default function Sidebar() {
  return (
    <>
      <aside className='w-64' aria-label='Sidebar'>
        <div className='overflow-y-auto rounded bg-gray-50 py-4 px-3 dark:bg-gray-800'>
          <ul className='space-y-2'>
            <li>
              <UnstyledLink
                href='/dashboard'
                className='flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              >
                <svg
                  className='h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                  <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                </svg>
                <span className='ml-3 font-bold'>Dashboard</span>
              </UnstyledLink>
            </li>
          </ul>
          <ul className='mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700'>
            {linksProfile.map((feature) => (
              <li key={feature.href}>
                <UnstyledLink
                  href={feature.href}
                  className='flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                >
                  {feature.label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <ul className='mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700'>
            {linksPet.map((feature) => (
              <li key={feature.href}>
                <UnstyledLink
                  href={feature.href}
                  className='flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                >
                  {feature.label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
