import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import InputText from '@/components/forms/InputText';
import InputButton from '@/components/forms/InputButton';
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
          <div className='layout min-h-screen grid grid-cols-2 mt-8 w-100'>
            <form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1 className="text-xl font-semibold">Daftar Akun</h1>
              <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
              <InputText label="Email" name="email" type="text" placeholder="Email anda" />
              <InputText label="Password" name="password" type="password" placeholder="Password anda" />
              <InputText label="Ketik ulang password" name="password-conf" type="password" placeholder="Password anda" />
              <div>
                <span>Sudah pernah mendaftar? <UnstyledLink href="/login" className="text-orange-600">Klik disini</UnstyledLink></span>
              </div>
              <InputButton text="Daftar" />
            </form>
            <div className="p-4">
              <img className="rounded-xl" src="/images/cover/register-cover.png" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}