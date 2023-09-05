import { Setting } from '@/collections/Setting';
import { CustomRepository } from 'fireorm';
import { AppRepository } from './AppRepository';

@CustomRepository(Setting)
export class SettingRepository extends AppRepository<Setting> {}
