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

function InitialPage(setEmail: any) {
	const [input, setInput] = React.useState('');

	function handleInput(e: any) {
      const val = e.target.value;
      setInput(val);
	}

    function handleSubmit(e: any) {
      // TODO: Should send email, if complete than do setEmail below
      setEmail(input);
    }

	return (<form onSubmit={handleSubmit} className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1 className="text-xl font-semibold">Reset Password</h1>
              <h2 className="text-base font-normal">Sebuah email yang berisi cara mengatur ulang password akan dikirim ke email anda.</h2>
              <InputText label="Email" name="email" type="text" placeholder="Email anda" onChange={handleInput} />
              <div>
                <span>Sudah ingat password? <UnstyledLink href="/login" className="text-orange-600">Klik disini</UnstyledLink></span>
              </div>
              <InputButton text="Reset" />
            </form>);
}

function SuccessPage(email: string) {
	return (<form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1 className="text-xl font-semibold">Reset Password</h1>
              <p className="text-base font-normal">
                Email langkah untuk atur ulang password telah dikirim pada {email}.
                Silahkan lakukan konfirmasi dengan cara klik link konfirmasi pada email yang berhasil dikirim.
              </p>
              <div>
                <span><UnstyledLink href="/login" className="text-orange-600">Klik disini</UnstyledLink> untuk kembali login.</span>
              </div>
            </form>);
}

export default function HomePage() {
  const [email, setEmail] = React.useState<string>('');

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen grid grid-cols-2 mt-8 w-100'>
            {email === ''
              ? <InitialPage setEmail={setEmail} />
              : <SuccessPage email={email} />
            }
            <div className="p-4">
              <img className="rounded-xl" src="/images/cover/register-cover.png" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
