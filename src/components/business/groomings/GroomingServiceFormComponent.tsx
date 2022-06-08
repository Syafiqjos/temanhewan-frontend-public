import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

import GroomingServicePriceComponent from '@/components/business/groomings/GroomingServicePriceComponent';

function GroomingServiceFormComponent({ service }: { service: any }) {
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Layanan Grooming</h1>
			<InputText label="Nama Layanan" name="order_name" value={service.name} disabled></InputText>
			<InputText label="Deskripsi Layanan" name="service_description" value={service.description} disabled></InputText>
			<div>
				<label>Biaya Layanan</label>
				<GroomingServicePriceComponent service={service} />
			</div>
		</form>;
}

export default GroomingServiceFormComponent;