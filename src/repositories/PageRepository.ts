import { Page } from '@/collections/Page';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Page)
class PageRepository extends AppRepository<Page> {}

export const pageRepository = getRepository(Page) as PageRepository;
