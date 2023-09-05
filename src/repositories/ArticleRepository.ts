import { Article } from '@/collections/Article';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Article)
export class ArticleRepository extends AppRepository<Article> {}
