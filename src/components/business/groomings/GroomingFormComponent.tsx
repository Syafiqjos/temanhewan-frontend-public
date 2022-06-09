import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function GroomingFormComponent({ user }: { user: any }){
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Jasa Grooming</h1>
			<InputText label="Email Jasa Grooming" name="grooming_email" value={user.email} disabled></InputText>
			<InputText label="No. Telp Grooming" name="grooming_phone" value={user.phone} disabled></InputText>
			<InputText label="Nama Jasa Grooming" name="grooming_name" value={user.name} disabled></InputText>
		</form>;
}

export default GroomingFormComponent;