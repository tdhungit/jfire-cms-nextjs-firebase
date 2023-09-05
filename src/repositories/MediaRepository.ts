import { Media } from '@/collections/Media';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Media)
export class MediaRepository extends AppRepository<Media> {}
