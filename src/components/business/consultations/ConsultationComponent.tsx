import * as React from 'react';

import ConsultationStatusComponent from '@/components/business/consultations/ConsultationStatusComponent';
import ButtonLink from '@/components/links/ButtonLink';

function ConsultationComponent({ consultation }: { consultation: any }) {
	return (
		<li className="mb-2">
			<div className="p-4 border rounded rounded-lg border-primary-500 flex flex-row justify-between">
				<div className="flex flex-col">
					<div className="font-semibold">{consultation.complaint}</div>
					<div className="mb-2">{consultation.address}</div>
					<div>{new Date(consultation.date).toUTCString().split(' ', 4).join(' ')} ({consultation.time})</div>
				</div>
				<div className="flex flex-row">
					<div>
						<ConsultationStatusComponent consultation={consultation} />
					</div>
					<div>
						<ButtonLink variant="primary" href={`/dashboard/consultation/i/${consultation.id}`}>Lihat</ButtonLink>
					</div>
				</div>
			</div>
		</li>
	);
}

export default ConsultationComponent;