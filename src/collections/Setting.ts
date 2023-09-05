import { SettingRepository } from '@/repositories/SettingRepository';
import { initDatabase } from '@/services/firebase';
import { Collection, getRepository } from 'fireorm';

initDatabase();

@Collection()
export class Setting {
	id: string = '';
	createdAt: Date = new Date();
	category: string = '';
	name: string = '';
	value: any = {};
	options: any = {};
}

export const settingRepository = getRepository(Setting) as SettingRepository;
