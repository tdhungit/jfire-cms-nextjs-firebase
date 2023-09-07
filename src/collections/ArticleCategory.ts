import { initDatabase } from '@/services/firebase';
import { Collection } from 'fireorm';

initDatabase();

@Collection()
export class ArticleCategory {
	id: string = '';
	createdAt: Date = new Date();
	status: string = 'Active';
	name: string = '';
	slug: string = '';
	description: string = '';
	seoKeyword: string = '';
	seoContent: string = '';
}
