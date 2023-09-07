import { initDatabase } from '@/services/firebase';
import { Collection } from 'fireorm';

const firebase = initDatabase();

export const fireStorage = firebase.storage;
export const storageBucket = firebase.bucket;

@Collection()
export class Media {
	id: string = '';
	createdAt: Date = new Date();
	modifiedAt: Date = new Date();
	token: string = '';
	name: string = '';
	url: string = '';
	type: string = '';
	options: any = {};
}
