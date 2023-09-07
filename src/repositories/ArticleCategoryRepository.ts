import { ArticleCategory } from '@/collections/ArticleCategory';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(ArticleCategory)
class ArticleCategoryRepository extends AppRepository<ArticleCategory> {}

export const articleCategoryRepository = getRepository(
	ArticleCategory,
) as ArticleCategoryRepository;
