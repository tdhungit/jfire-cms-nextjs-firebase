import { ArticleCategory } from '@/collections/ArticleCategory';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(ArticleCategory)
export class ArticleCategoryRepository extends AppRepository<ArticleCategory> {}
