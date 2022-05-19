import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen grid grid-cols-1 mt-8 w-100'>
            <div className="p-4 grid grid-cols-2 gap-3">
				<div className="p-4 flex flex-col gap-3">
				  <h1 className="text-xl font-semibold">Hewan anda ingin sembuh? ada tapi?</h1>
				  <h2 className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
				  <ButtonLink variant="primary" href="/">Baca Lengkap</ButtonLink>
				</div>
				<div className="p-4">
				  <img className="rounded-xl" src="/images/cover/homepage-cover-1.png" />
				</div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
                <div className="p-4">
				  <img className="rounded-xl" src="/images/cover/homepage-cover-2.png" />
				</div>
				<div className="p-4 flex flex-col gap-3">
				  <h1 className="text-xl font-semibold">Kesehatan teman setia dirumah?</h1>
				  <h2 className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
				  <ButtonLink variant="primary" href="/">Baca Lengkap</ButtonLink>
				</div>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3">
				<div className="p-4 flex flex-col gap-3">
				  <h1 className="text-xl font-semibold">Bukti kesehatan hewan selalu bersih</h1>
                  <img className="rounded-xl" src="/images/cover/homepage-cover-1.png" />
				  <h2 className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
				  <ButtonLink variant="primary" href="/">Baca Lengkap</ButtonLink>
				</div>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3">
				<div className="p-4 flex flex-col gap-3">
				  <h1 className="text-xl font-semibold">Dokter Hewan Berkualitas yang siap berkorban</h1>
                  <img className="rounded-xl" src="/images/cover/homepage-cover-2.png" />
				  <h2 className="text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
				  <ButtonLink variant="primary" href="/">Baca Lengkap</ButtonLink>
				</div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}