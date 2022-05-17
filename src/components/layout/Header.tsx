import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import ButtonLink from '@/components/links/ButtonLink';

const links = [
  { href: '/forum', label: 'Forum', type: '' },
  { href: '/contact-us', label: 'Contact', type: '' },
  { href: '/faq', label: 'FAQ', type: '' },
  { href: '/about', label: 'About', type: '' },
  { href: '/login', label: 'Login', type: 'primary' },
];

export default function Header() {
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
