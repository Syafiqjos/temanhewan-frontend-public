import PetType from '@/enums/PetType';

export default interface Pet {
	id: string,
	name: string,
	type: PetType,
	sex: 'm' | 'f',
	imageUrl?: string
};