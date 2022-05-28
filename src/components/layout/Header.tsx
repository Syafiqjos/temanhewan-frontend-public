import * as React from 'react';
import { useAuthState, useAuthDispatch } from '@/providers/AuthContextProvider';
import AuthService from '@/services/AuthService';

import UnstyledLink from '@/components/links/UnstyledLink';
import ButtonLink from '@/components/links/ButtonLink';

const linksNotLogined = [
  { href: '/forum', label: 'Forum', type: '' },
  { href: '/contact-us', label: 'Contact', type: '' },
  { href: '/faq', label: 'FAQ', type: '' },
  { href: '/about', label: 'About', type: '' },
  { href: '/login', label: 'Login', type: 'primary' },
];

const linksLogined = [
  { href: '/forum', label: 'Forum', type: '' },
  { href: '/contact-us', label: 'Contact', type: '' },
  { href: '/faq', label: 'FAQ', type: '' },
  { href: '/about', label: 'About', type: '' },
  { href: '/my-pet', label: 'My Pets', type: '' },
  { href: '/my-profile', label: 'Profile', type: '' },
  { href: '/dashboard', label: 'Dashboard', type: 'primary' },
];

export default function Header() {

	const authState = useAuthState();

	const links = (authState.authenticated || AuthService.getToken() != '' && AuthService.getToken() != undefined) ? linksLogined : linksNotLogined;

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-16 py-2 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600 flex'>
          <img className='h-8' src="/images/logo.png" />
          <img className='h-8' src="/images/logo-text.png" />
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-8 text-gray-500'>
			{links.map(({ href, label, type }) => (
              <li key={`${href}${label}`}>
				{
					type === 'primary'
					? <ButtonLink href={href} variant='primary'>{label}</ButtonLink>
					: <UnstyledLink href={href} className='hover:text-gray-600'>{label}</UnstyledLink>
				}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
