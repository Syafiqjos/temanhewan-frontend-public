import { useRouter } from 'next/router';
import * as React from 'react';

import UnstyledLink from '../links/UnstyledLink';

const linksComment = [
  { href: '/dashboard/my-comment', label: 'Komentar Saya' },
];

const linksProfile = [
  { href: '/dashboard/my-profile', label: 'Profil Saya' },
  { href: '/dashboard/edit-profile', label: 'Edit Profil' },
  { href: '/dashboard/change-password', label: 'Ubah Password' },
];

const linksConsultation = [
  { href: '/dashboard/consultation', label: 'Konsultasi Saya' },
];

const linksOther = [{ href: '/dashboard/logout', label: 'Logout' }];

export default function SidebarDoctor({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const activeClassNames =
    'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 active:bg-primary-600 active:text-white';
  const classNames =
    'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100';

  return (
    <>
      <div className='layout flex flex-row'>
        <div>
          <aside className='w-64' aria-label='Sidebar'>
            <div className='overflow-y-auto rounded bg-white py-4 px-3 dark:bg-gray-800'>
              <ul className='space-y-2'>
                <li>
                  <UnstyledLink
                    href='/dashboard'
                    className={
                      router.pathname === '/dashboard'
                        ? activeClassNames
                        : classNames
                    }
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
                      className={
                        router.pathname === `${feature.href}`
                          ? activeClassNames
                          : classNames
                      }
                    >
                      {feature.label}
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
              <ul className='mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700'>
                {linksConsultation.map((feature) => (
                  <li key={feature.href}>
                    <UnstyledLink
                      href={feature.href}
                      className={
                        router.pathname === `${feature.href}`
                          ? activeClassNames
                          : classNames
                      }
                    >
                      {feature.label}
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
              <ul className='mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700'>
                {linksComment.map((feature) => (
                  <li key={feature.href}>
                    <UnstyledLink
                      href={feature.href}
                      className={
                        router.pathname === `${feature.href}`
                          ? activeClassNames
                          : classNames
                      }
                    >
                      {feature.label}
                    </UnstyledLink>
                  </li>
                ))}
              </ul>

              <ul className='mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700'>
                {linksOther.map((feature) => (
                  <li key={feature.href}>
                    <UnstyledLink
                      href={feature.href}
                      className={
                        router.pathname === `${feature.href}`
                          ? activeClassNames
                          : classNames
                      }
                    >
                      {feature.label}
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <div className='flex-auto pl-5 pt-5'>{children}</div>
      </div>
    </>
  );
}
