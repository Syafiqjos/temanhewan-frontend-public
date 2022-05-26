import PetType from '@/enums/PetType';

export default interface Pet {
	id?: string,
	name: string,
	description: string,
	race: PetType,
	gender: 'm' | 'f',
	imageUrl?: string
};