import * as React from 'react';
import { useRouter } from 'next/router';

import AuthAPI from '@/api/AuthAPI';
import LogoutAPI from '@/api/LogoutAPI';
import UpdateUserProfileAPI from '@/api/UpdateUserProfileAPI';
import ChangeUserPasswordAPI from '@/api/ChangeUserPasswordAPI';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import InputText from '@/components/forms/InputText';
import InputButton from '@/components/forms/InputButton';

import UnauthorizedRedirect from '@/components/auths/UnauthorizedRedirect';

import { useAuthState, useAuthDispatch } from '@/providers/AuthContextProvider';
import AuthService from '@/services/AuthService';

import Link from 'next/link';

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

function CustomButton({ onClick, children, active } : { onClick: any, children: any, active?: boolean }) {
	const classNames = 'p-2 rounded-lg cursor-pointer';
	const activeClassNames = 'bg-orange-600 text-white';

	return (<li onClick={onClick} className={`${classNames} ${active ? activeClassNames : ''}`}>{children}</li>);
}

function SeeProfileForm() {
	const [profileImage, setProfileImage] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [name, setName] = React.useState('');
	const [role, setRole] = React.useState('customer');
	const [address, setAddress] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [gender, setGender] = React.useState('');
	const [birthdate, setBirthdate] = React.useState('');

	const refreshUserProfile = async () => {
		const token = AuthService.getToken();
		const res = await AuthAPI({token: token as string});
		const success = res.success;
		if (success) {
			const profile = res.data;
			setProfileImage(profile.profile_image);
			setEmail(profile.email);
			setUsername(profile.username);
			setName(profile.name);
			setPhone(profile.phone);
			setAddress(profile.address);
			setGender(profile.gender);
			setBirthdate(profile.birthdate);
			setRole(profile.role);
		}
	};

	React.useEffect(() => {
		refreshUserProfile();
	}, []);

	return <form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
					  <h1 className="text-xl font-semibold">Lihat profile</h1>
					  <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
						<img src={profileImage} />
					  <InputText label="Email" name="email" type="text" placeholder="Email anda" disabled value={email} />
					  <InputText label="Nama" name="name" type="text" placeholder="Nama anda" disabled value={name} />
					  <InputText label="Tanggal lahir" name="birthdate" type="date" placeholder="Tanggal lahir anda" disabled value={birthdate} />
					  <div className="flex flex-col items-start w-full">
						<label htmlFor="gender">Jenis kelamin</label>
						<select name="gender" id="gender" className="border-0 rounded-l w-full p-4 bg-gray-100" disabled value={gender}>
							<option value="" disabled>Pilih jenis kelamin anda..</option>
							<option value="m">Laki - laki</option>
							<option value="f">Perempuan</option>
						</select>
					  </div>
					  <InputText label="No. HP" name="phone" type="text" placeholder="No. HP anda" disabled value={phone} />
					  <InputText label="Alamat" name="address" type="text" placeholder="Alamat anda" disabled value={address} />
					</form>;
}

function UpdateProfileForm({ onSubmit }: { onSubmit?: any }) {
	const [email, setEmail] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [name, setName] = React.useState('');
	const [role, setRole] = React.useState('customer');
	const [address, setAddress] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [gender, setGender] = React.useState('');
	const [birthdate, setBirthdate] = React.useState('');

	const refreshUserProfile = async () => {
		const token = AuthService.getToken();
		const res = await AuthAPI({token: token as string});
		const success = res.success;
		if (success) {
			const profile = res.data;
			setEmail(profile.email);
			setUsername(profile.username);
			setName(profile.name);
			setPhone(profile.phone);
			setAddress(profile.address);
			setGender(profile.gender);
			setBirthdate(profile.birthdate);
			setRole(profile.role);
		}

		return res;
	};

	React.useEffect(() => {
		refreshUserProfile();
	}, []);

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

	async function handleSubmit(e: any) {
		e.preventDefault();
		console.log('submit update profile');

		const res = await UpdateUserProfileAPI({
			name,
			birthdate,
			address,
			phone,
			gender
		});
		console.log(res);
		const success = res.success;
		if (success) {
			console.log('update user success');
		} else {
			console.log('update user failed');
		}

		// const updatedUserProfile = await refreshUserProfile();
		if (onSubmit !== undefined) {
			onSubmit();
		}
	}

	return <form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
					  <h1 className="text-xl font-semibold">Perbarui profile</h1>
					  <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
					  <InputText label="Email" name="email" type="text" placeholder="Email anda" disabled value={email} />
					  <InputText label="Nama" name="name" type="text" placeholder="Nama anda" value={name} onChange={handleName} />
					  <InputText label="Tanggal lahir" name="birthdate" type="date" placeholder="Tanggal lahir anda" value={birthdate} onChange={handleBirthdate} />
					  <div className="flex flex-col items-start w-full">
						<label htmlFor="gender">Jenis kelamin</label>
						<select name="gender" id="gender" onChange={handleGender} className="border-0 rounded-l w-full p-4 bg-gray-100" value={gender}>
							<option value="" disabled>Pilih jenis kelamin anda..</option>
							<option value="m">Laki - laki</option>
							<option value="f">Perempuan</option>
						</select>
					  </div>
					  <InputText label="No. HP" name="phone" type="text" placeholder="No. HP anda" onChange={handlePhone} value={phone} />
					  <InputText label="Alamat" name="address" type="text" placeholder="Alamat anda" onChange={handleAddress} value={address} />
					  <InputButton text="Perbarui" />
					</form>;
}

function ChangePasswordProfileForm({ onSubmit }: { onSubmit?: any }) {
	const [oldPassword, setOldPassword] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordConf, setPasswordConf] = React.useState('');

	function handleOldPassword(e: any) {
		setOldPassword(e.target.value);
	}

	function handlePassword(e: any) {
		setPassword(e.target.value);
	}

	function handlePasswordConf(e: any) {
		setPasswordConf(e.target.value);
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		console.log('submit change password');

		const res = await ChangeUserPasswordAPI({ old_password: oldPassword, password: password, password_confirmation: passwordConf });
		console.log(res);
		const success = res.success;
		if (success) {
			console.log('change password success');
		} else {
			console.log('change password failed');
		}

		if (onSubmit !== undefined) {
			onSubmit();
		}
	}

	return <form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
					  <h1 className="text-xl font-semibold">Ubah password</h1>
					  <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
					  <InputText label="Password lama" name="old_password" type="password" placeholder="Password lama anda" value={oldPassword} onChange={handleOldPassword} />
					  <InputText label="Password baru" name="password" type="password" placeholder="Password baru anda" value={password} onChange={handlePassword} />
					  <InputText label="Ketik ulang password baru anda" name="password_confirmation" type="password" placeholder="Password baru anda" value={passwordConf} onChange={handlePasswordConf} />
					  <InputButton text="Ubah password" />
					</form>;
}

function LogoutProfileForm() {
	const router = useRouter();
	const authDispatch = useAuthDispatch();

	async function handleSubmit(e: any) {
		e.preventDefault();
		console.log('submit logout');
		const res = await LogoutAPI();
		console.log(res);
		const success = res.success;
		if (success) {
			authDispatch({ type:'LOGOUT' });
			router.push('/');
		}
	}

	return <form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
					  <h1 className="text-xl font-semibold">Logout Akun</h1>
					  <h2 className="text-base font-normal">Silahkan klik tombol dibawah untuk logout dari akun anda.</h2>
					  <InputButton text="Logout" />
					</form>;
}

export default function HomePage() {
  const [ pageState, setPageState ] = React.useState<'SEE' | 'UPDATE' | 'CHANGEPASSWORD' | 'LOGOUT'>('SEE');

  function handleSeeProfileButton(e: any) {
	console.log('see profile button');
	setPageState('SEE');
  }

  function handleUpdateProfileButton(e: any) {
	console.log('update profile button');
	setPageState('UPDATE');
  }

  function handleUpdatePasswordButton(e: any) {
	console.log('update password button');
	setPageState('CHANGEPASSWORD');
  }

  function handleLogoutButton(e: any) {
	console.log('logout');
	setPageState('LOGOUT');
  }

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		
			<section className='bg-white'>
			  <div className='layout grid grid-cols-1 mt-8 w-100'>
				<h1 className="text-xl font-semibold mb-2">Profil saya</h1>
				<div className="px-4 grid grid-cols-4 gap-3">
					<div className="flex flex-col gap-1">
						<ul className="p-4">
							<CustomButton onClick={handleSeeProfileButton} active={pageState === 'SEE'}>Lihat Profile</CustomButton>
							<CustomButton onClick={handleUpdateProfileButton} active={pageState === 'UPDATE'}>Perbarui Profile</CustomButton>
							<CustomButton onClick={handleUpdatePasswordButton} active={pageState === 'CHANGEPASSWORD'}>Ubah Password</CustomButton>
							<CustomButton onClick={handleLogoutButton} active={pageState === 'LOGOUT'}>Logout</CustomButton>
						</ul>
					</div>
					<div className="p-4 grid grid-cols-1 col-span-3">
					  {pageState === 'SEE' && <SeeProfileForm />}
					  {pageState === 'UPDATE' && <UpdateProfileForm onSubmit={handleSeeProfileButton} />}
					  {pageState === 'CHANGEPASSWORD' && <ChangePasswordProfileForm onSubmit={handleSeeProfileButton} />}
					  {pageState === 'LOGOUT' && <LogoutProfileForm />}
					</div>
				</div>
			  </div>
			</section>
		
      </main>
    </>
  );
}