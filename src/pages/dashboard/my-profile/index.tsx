import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Seo from '@/components/Seo';

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';

import MyProfileDoctor from './ProfileDoctor';
import MyProfileGroomer from './ProfileGroomer';

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
			<main>
				<ShouldAuthorized>
					<ShouldAuthorized roleSpecific='customer' dontRedirect={true}>
						<MyProfile />
					</ShouldAuthorized>
					<ShouldAuthorized roleSpecific='doctor' dontRedirect={true}>
						<MyProfileDoctor />
					</ShouldAuthorized>
					<ShouldAuthorized roleSpecific='grooming' dontRedirect={true}>
						<MyProfileGroomer />
					</ShouldAuthorized>
				</ShouldAuthorized>
			</main>
	</>
}