import * as React from 'react';

import UnauthorizedRedirect from '@/components/auths/UnauthorizedRedirect';
import InputButton from '@/components/forms/InputButton';
import InputText from '@/components/forms/InputText';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import LoginAPI from '@/api/LoginAPI';
import RegisterAPI from '@/api/RegisterAPI';
import { useAuthDispatch,useAuthState } from '@/providers/AuthContextProvider';
import AuthService from '@/services/AuthService';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

function RegisterForm() {

	const authState = useAuthState();
	const authDispatch = useAuthDispatch();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [password_confirmation, setPasswordConf] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [name, setName] = React.useState('');
	const [role, setRole] = React.useState('customer');
	const [address, setAddress] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [gender, setGender] = React.useState('m');
	const [birthdate, setBirthdate] = React.useState<Date>(new Date());

	function handleEmail(e: any){
		setEmail(e.target.value);
		setUsername(e.target.value);
	}

	function handlePassword(e: any){
		setPassword(e.target.value);
	}

	function handlePasswordConf(e: any){
		setPasswordConf(e.target.value);
	}

	function handleName(e: any) {
		setName(e.target.value);
	}

	function handleAddress(e: any) {
		setAddress(e.target.value);
	}

	function handlePhone(e: any) {
		setPhone(e.target.value);
	}

	function handleGender(e: any) {
		setGender(e.target.value);
	}

	function handleBirthdate(e: any) {
		setBirthdate(e.target.value);
	}

	async function handleRegister() {
		const res = await RegisterAPI({ email, password, password_confirmation, name, username, role, phone, birthdate, gender, address });
		console.log(res);
		const success = res.success;
		if (success)  {
			return true;
		}
		return false;
	}

	async function handleLogin() {
		const res = await LoginAPI({ email, password });
		console.log(res);
		const accessToken = res.data.access_token;
		if (accessToken !== null || accessToken !== undefined)  {
			AuthService.storeToken(accessToken);
			authDispatch({ type:'LOGIN', payload: { email, name, role } });
			return true;
		}
		return false;
	}

	async function handleSubmit(e: any){
		e.preventDefault();
		if (await handleRegister()) {
			console.log('success register.');
			if (await handleLogin()) {
				console.log('success login.');
			} else {
				console.log('error login.');
			}
		} else {
			console.log('something went wrong.');
		}
	}

	return (<form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold">Daftar Akun</h1>
              <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
			  <InputText label="Nama" name="name" type="text" placeholder="Nama anda" onChange={handleName} />
              <InputText label="Email" name="email" type="text" placeholder="Email anda" onChange={handleEmail} />
              <InputText label="Password" name="password" type="password" placeholder="Password anda" onChange={handlePassword} />
              <InputText label="Ketik ulang password" name="password-conf" type="password" placeholder="Password anda" onChange={handlePasswordConf} />
			  <InputText label="Tanggal lahir" name="birthdate" type="date" placeholder="Tanggal lahir anda" onChange={handleBirthdate} />
			  <div className="flex flex-col items-start w-full">
				<label htmlFor="gender">Jenis kelamin</label>
				<select name="gender" id="gender"onChange={handleGender} className="border-0 rounded-l w-full p-4 bg-gray-100" defaultValue="">
					<option value="" disabled>Pilih jenis kelamin anda..</option>
					<option value="m">Laki - laki</option>
					<option value="f">Perempuan</option>
				</select>
			  </div>
			  <InputText label="No. HP" name="phone" type="text" placeholder="No. HP anda" onChange={handlePhone} />
			  <InputText label="Alamat" name="address" type="text" placeholder="Alamat anda" onChange={handleAddress} />
              <div>
                <span>Sudah pernah mendaftar? <UnstyledLink href="/login" className="text-primary-500">Klik disini</UnstyledLink></span>
              </div>
              <InputButton text="Daftar" />
            </form>);
}

export default function HomePage() {
  return (
    <>
      <Seo title = "Register" />

      <main>
				<UnauthorizedRedirect>
					<section className='bg-white'>
						<div className='layout min-h-screen grid grid-cols-2 mt-8 w-100'>
						<RegisterForm/>
						<div className="p-4">
							<img className="rounded-xl" src="/images/cover/register-cover.png" alt="register image" />
						</div>
						</div>
					</section>
				</UnauthorizedRedirect>
      </main>
    </>
  );
}
