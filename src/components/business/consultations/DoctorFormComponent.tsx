import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function DoctorFormComponent({ user }: { user: any }){
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Dokter</h1>
			<InputText label="Email Dokter" name="doctor_email" value={user.email} disabled></InputText>
			<InputText label="Nama Dokter" name="doctor_name" value={user.name} disabled></InputText>
		</form>;
}

export default DoctorFormComponent;