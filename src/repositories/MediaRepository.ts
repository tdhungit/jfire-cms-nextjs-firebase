import { Media } from '@/collections/Media';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Media)
class MediaRepository extends AppRepository<Media> {}

export const mediaRepository = getRepository(Media) as MediaRepository;
