import { Setting } from '@/collections/Setting';
import { CustomRepository, getRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Setting)
class SettingRepository extends AppRepository<Setting> {}

export const settingRepository = getRepository(Setting) as SettingRepository;
