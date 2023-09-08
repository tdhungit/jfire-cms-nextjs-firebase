import { Setting } from '@/collections/Setting';
import { AppRepository } from './AppRepository';

class SettingRepository extends AppRepository<Setting> {}

export const settingRepository = new SettingRepository(Setting);
