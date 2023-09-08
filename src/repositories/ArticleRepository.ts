import { Article } from '@/collections/Article';
import { AppRepository } from './AppRepository';

class ArticleRepository extends AppRepository<Article> {}

export const articleRepository = new ArticleRepository(Article);
