import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

import ConsultationStatusComponent from '@/components/business/consultations/ConsultationStatusComponent';

function ConsultationStatusFormComponent({ consultation }: { consultation: any }) {
	return <form className="border rounded-lg border-primary-500 p-8 mb-4">
			<h1 className="text-lg mb-4">Status Konsultasi</h1>
			<ConsultationStatusComponent consultation={consultation} />
		</form>;
}

export default ConsultationStatusFormComponent;