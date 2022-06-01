import * as React from 'react';

import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';


export default function MyProfile() {

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


	return <>
		<Seo title="My Profile" />

		<div className="flex flex-row">
			<div>
				<Sidebar />
			</div>
			<div className="ml-5 mt-5">
		<form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
					  <h1 className="text-xl font-semibold">Profil Saya</h1>
						<img src={profileImage} alt="profile image" className="w-40 h-40" />
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
			</form>
		</div>
		</div>
	</>
}