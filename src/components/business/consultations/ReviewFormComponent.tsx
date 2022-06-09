import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function ReviewFormComponent({ review }: { review: any }) {
	return <form className="border rounded-lg border-primary-500 p-8 mb-4">
			<h1 className="text-lg mb-4">Review Pelanggan</h1>
			<InputText label="Rating" name="review_rating" value={review.rating + " Star(s)"} disabled></InputText>
			<textarea className="bg-white text-primary-500 rounded-xl border-primary-500 p-4 inline border-2 w-full mb-2" placeholder="Review pelanggan" defaultValue={review.review} disabled></textarea>
			<InputText label="Publikasi" name="review_rating" value={review.is_public == 1 ? 'Review ditampilkan ke public' : 'Review bersifat privasi dan hanya ditunjukkan kepada doktter hewan konsultasi'} disabled></InputText>
		</form>;
}

export default ReviewFormComponent;