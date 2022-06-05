import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function ConsultationForm({ consultation }: { consultation: any }) {
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Konsultasi</h1>
			<InputText label="Komplain" name="consultation_complaint" value={consultation.complaint} disabled></InputText>
			<InputText label="Alamat Konsultasi" name="consultation_address" value={consultation.address} disabled></InputText>
			<InputText label="Tanggal Konsultasi" name="consultation_date" value={consultation.date} disabled></InputText>
			<InputText label="Waktu Konsultasi" name="consultation_time" value={consultation.time} disabled></InputText>
		</form>;
}

export default ConsultationForm;