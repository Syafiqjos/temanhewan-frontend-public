import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function PetFormComponent({ pet }: { pet: any }) {
	function getPetRace(race) {
		if (race == 'cat') return 'Kucing';
		else if (race == 'dog') return 'Anjing';
	}

	function getPetGender(gender) {
		if (gender == 'f') return 'Betina';
		else if (race == 'm') return 'Jantan';
	}

	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Hewan Peliharaan</h1>
			<div className="flex flex-row">
				<div className="mr-4">
					<img src={pet.profile_image} />
				</div>
				<div className="w-full">
					<InputText label="Nama Peliharaan" name="pet_name" value={pet.name} disabled></InputText>
					<InputText label="Jenis Peliharaan" name="pet_race" value={getPetRace(pet.race)} disabled></InputText>
					<InputText label="Jenis Kelamin Peliharaan" name="pet_gender" value={getPetGender(pet.gender)} disabled></InputText>
					<InputText label="Deskripsi Peliharaan" name="pet_description" value={pet.description} disabled></InputText>
				</div>
			</div>
		</form>;
}

export default PetFormComponent;