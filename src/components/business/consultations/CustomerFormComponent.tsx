import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function CustomerFormComponent({ user }: { user: any }) {
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Pelanggan</h1>
			<InputText label="Email Pelanggan" name="customer_email" value={user.email} disabled></InputText>
			<InputText label="Nama Pelanggan" name="customer_name" value={user.name} disabled></InputText>
		</form>;
}

export default CustomerFormComponent;