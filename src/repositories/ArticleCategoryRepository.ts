import { ArticleCategory } from '@/collections/ArticleCategory';
import { AppRepository } from './AppRepository';

class ArticleCategoryRepository extends AppRepository<ArticleCategory> {}

export const articleCategoryRepository = new ArticleCategoryRepository(ArticleCategory);
