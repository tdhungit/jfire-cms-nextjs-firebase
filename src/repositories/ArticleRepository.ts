import { Article } from '@/collections/Article';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Article)
class ArticleRepository extends AppRepository<Article> {}

export const articleRepository = getRepository(Article) as ArticleRepository;
