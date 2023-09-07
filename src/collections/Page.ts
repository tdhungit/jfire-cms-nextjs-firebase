import { initDatabase } from '@/services/firebase';
import { Collection } from 'fireorm';

initDatabase();

@Collection()
export class Page {
	id: string = '';
	createdAt: Date = new Date();
	title: string = '';
	slug: string = '';
	content: string = '';
	isDefault: boolean = false;
	seoKeyword: string = '';
	seoContent: string = '';
}
