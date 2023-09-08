import { Media } from '@/collections/Media';
import { AppRepository } from './AppRepository';

class MediaRepository extends AppRepository<Media> {}

export const mediaRepository = new MediaRepository(Media);
