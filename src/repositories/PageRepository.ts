import { Page } from '@/collections/Page';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Page)
export class PageRepository extends AppRepository<Page> {}
