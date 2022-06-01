import * as React from 'react';

import InputButton from '@/components/forms/InputButton';
import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import ChangeUserPasswordAPI from '@/api/ChangeUserPasswordAPI';

export default function ChangePassword({ onSubmit }: { onSubmit?: any }) {
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

	return <>
    <Seo title="Change Password"/>

    <Sidebar>
        <form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold">Ubah password</h1>
          <InputText label="Password lama" name="old_password" type="password" placeholder="Password lama anda" value={oldPassword} onChange={handleOldPassword} />
          <InputText label="Password baru" name="password" type="password" placeholder="Password baru anda" value={password} onChange={handlePassword} />
          <InputText label="Ketik ulang password baru anda" name="password_confirmation" type="password" placeholder="Password baru anda" value={passwordConf} onChange={handlePasswordConf} />
          <InputButton text="Ubah password" />
        </form>
		</Sidebar>
  </>
}