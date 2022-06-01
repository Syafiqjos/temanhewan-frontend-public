import * as React from 'react';

import InputButton from '@/components/forms/InputButton';
import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import AuthAPI from '@/api/AuthAPI';
import UpdateUserProfileAPI from '@/api/UpdateUserProfileAPI';
import AuthService from '@/services/AuthService';


export default function EditProfile({ onSubmit }: { onSubmit?: any }) {

	const profileImageInput = React.useRef(null);

	const [profileImage, setProfileImage] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [name, setName] = React.useState('');
	const [role, setRole] = React.useState('customer');
	const [address, setAddress] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [gender, setGender] = React.useState('');
	const [birthdate, setBirthdate] = React.useState('');

	function getProfileImage(){
		const input: any = profileImageInput.current!;
		if (input.files && input.files.length > 0) {
			return input.files[0];
		}

		return undefined;
	}

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
			gender,
			profile_image: getProfileImage()
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

	return <>
    <Seo title="Edit Profile" />

    <Sidebar>
      <form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
				<h1 className="text-xl font-semibold">Edit Profil</h1>
				<img src={profileImage} alt = "profile image" className="h-40 w-40"/>
				<div className="flex flex-col items-start w-full">
					<label htmlFor="petType">Ubah foto profil</label>
					<input ref={profileImageInput} name="profile_image" type="file" accept="image/*" />
				</div>
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
			</form>
    </Sidebar>
  </>

}

