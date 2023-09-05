import { ArticleRepository } from '@/repositories/ArticleRepository';
import { initDatabase } from '@/services/firebase';
import { Collection, getRepository } from 'fireorm';

initDatabase();

@Collection()
export class Article {
	id: string = '';
	createdAt: Date = new Date();
	modifiedAt: Date = new Date();
	publishAt: Date = new Date();
	status: string = 'Active';
	name: string = '';
	slug: string = '';
	description: string = '';
	content: string = '';
	weight: number = 0;
	userId: string = '';
	categories: string[] = [];
	thumbnail: string = '';
	photo: string = '';
	source: string = '';
	seoKeyword: string = '';
	seoContent: string = '';

	setRecord(record: any) {
		for (let field in record) {
			(<any>this)[field] = record[field];
		}
	}
}

export const articleRepository = getRepository(Article) as ArticleRepository;
