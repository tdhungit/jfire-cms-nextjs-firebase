import { Setting } from '@/collections/Setting';
import { User } from '@/collections/User';
import { settingRepository } from '@/repositories/SettingRepository';
import { userRepository } from '@/repositories/UserRepository';
import { NextRequest, NextResponse } from 'next/server';
import { Md5 } from 'ts-md5';

export async function POST(req: NextRequest) {
	const { email, password, url, title } = await req.json();
	if (!email || !password || !url || !title) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	const adminUser: any = await userRepository.whereArrayContains('roles', 'ADMIN').find();
	if (adminUser && adminUser[0]) {
		return NextResponse.json({ message: 'Installed Exist' }, { status: 404 });
	}

	const user = new User();
	user.email = email;
	user.firstName = 'System';
	user.lastName = 'Admin';
	user.roles = ['ADMIN'];

	let md5 = new Md5();
	md5.appendStr(password);
	user.password = md5.end()?.toString() || '';

	await userRepository.create(user);

	const settingUrl = new Setting();
	settingUrl.category = 'System';
	settingUrl.name = 'url';
	settingUrl.value = url;

	await settingRepository.create(settingUrl);

	const settingTitle = new Setting();
	settingTitle.category = 'System';
	settingTitle.name = 'title';
	settingTitle.value = title;

	await settingRepository.create(settingTitle);

	return NextResponse.json({ error: 0 });
}
