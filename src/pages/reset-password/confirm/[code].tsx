import * as React from 'react';
import { useRouter } from 'next/router'

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

interface UserDetails {
  code: string,
  email: string
};

function LoadingPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Memuat..</h1>
    </div>
  );
}

function NotFoundPage() {
	return (<form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1 className="text-xl font-semibold">Code reset password tidak ada atau kadaluarsa</h1>
              <p className="text-base font-normal">
                Silahkan periksa ulang link yang telah dikirim pada email anda.
              </p>
              <div>
                <span><UnstyledLink href="/login" className="text-orange-600">Klik disini</UnstyledLink> untuk kembali login.</span>
              </div>
            </form>);
}

function SuccessPage({ email }: { email: string }) {
	return (<form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
              <h1 className="text-xl font-semibold">Reset Password</h1>
              <p className="text-base font-normal">
                Reset password anda telah berhasil!
              </p>
              <div>
                <span><UnstyledLink href="/login" className="text-orange-600">Klik disini</UnstyledLink> untuk login dengan password baru anda.</span>
              </div>
            </form>);
}

function InitialPage({ email, setPassword, setPasswordConf, handleResetPassword }: {email: string, setPassword: any, setPasswordConf: any, handleResetPassword:any}) {
 return (<form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleResetPassword}>
	  <h1 className="text-xl font-semibold">Buat Password Baru</h1>
	  <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
	  <InputText label="Email" name="email" type="text" placeholder="Email anda" value={email} disabled />
	  <InputText label="Password" name="password" type="password" placeholder="Password anda" onChange={setPassword} />
	  <InputText label="Ketik ulang password" name="password-conf" type="password" placeholder="Password anda" onChange={setPasswordConf} />
	  <InputButton text="Ubah password" />
	</form>);
}

export default function HomePage() {
  // check link query
  const router = useRouter();

  const [userDetails, setUserDetails] = React.useState<UserDetails>(null);
  const [password, setPassword] = React.useState(null);
  const [passwordConf, setPasswordConf] = React.useState(null);
  const [status, setStatus] = React.useState('LOADING');

  function handleResetPassword(e: any) {
    e.preventDefault();
    
    // handle reset password if succes then change status
    setStatus('SUCCESS');
  }

  React.useEffect(() => {
    if (!router.isReady) return;

    const { code } = router.query;

    // check code then retrieve data
    const codes: UserDetails[] = [
       { code: 'aaaa', email: 'dummy@gmail.com' },
       { code: 'bbbb', email: 'example@gmail.com' }
    ];

    const details = codes.find((x) => x.code == code);

    if (details) {
      setUserDetails(details);
      setStatus('INPUT');
    } else {
      setStatus('NOTFOUND');
    }
  }, [ router.isReady ]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen grid grid-cols-2 mt-8 w-100'>
            {status === 'LOADING' && <LoadingPage/>}
            {status === 'INPUT' && <InitialPage email={userDetails.email} setPassword={setPassword} setPasswordConf={setPasswordConf} handleResetPassword={handleResetPassword}/>}
            {status === 'NOTFOUND' && <NotFoundPage/>}
            {status === 'SUCCESS' && <SuccessPage email={userDetails.email}/>}
            <div className="p-4">
              <img className="rounded-xl" src="/images/cover/login-cover.png" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
