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
          <div className='layout flex min-h-screen items-center justify-center text-center w-100'>
            <form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1>Masuk Akun</h1>
              <h2>Dapatkan sensasi hewan peliharaan.</h2>
              <div className="flex flex-col items-start">
                <label for="email">Email/Username</label>
                <input className="bg-gray-100 border-0 rounded-l w-full" type="text" name="email" id="email" placeholder="Email anda" />
              </div>
              <div className="flex flex-col items-start">
                <label for="password">Password</label>
                <input className="bg-gray-100 border-0 rounded-l w-full" type="text" name="password" id="password" placeholder="Password anda" />
              </div>
              <div>
                <span>Lupa password? <UnstyledLink href="/reset-password">Klik disini</UnstyledLink></span>
              </div>
              <div>
                <span>Belum pernah mendaftar? <UnstyledLink href="/sign-up">Klik disini</UnstyledLink></span>
              </div>
              <div>
                <input className="bg-orange-600 text-white p-4 px-8 cursor-pointer rounded-xl" type="submit" value="Masuk" />
              </div>
            </form>
            <div className="p-4">
              <img className="rounded-xl" src="/images/cover/login-cover.png" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
