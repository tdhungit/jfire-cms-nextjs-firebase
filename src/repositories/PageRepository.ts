import { Page } from '@/collections/Page';
import { AppRepository } from './AppRepository';

class PageRepository extends AppRepository<Page> {}

export const pageRepository = new PageRepository(Page);
