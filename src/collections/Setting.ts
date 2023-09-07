import { initDatabase } from '@/services/firebase';
import { Collection } from 'fireorm';

initDatabase();

@Collection()
export class Setting {
	id: string = '';
	createdAt: Date = new Date();
	category: string = '';
	name: string = '';
	value: any = {};
	options: any = {};
}
