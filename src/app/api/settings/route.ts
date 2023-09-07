import { Setting } from '@/collections/Setting';
import { settingRepository } from '@/repositories/SettingRepository';
import { getSessionUser } from '@/utils/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const category = req.nextUrl.searchParams.get('category');
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}
	let settings;
	if (category) {
		settings = await settingRepository.whereEqualTo('category', category).find();
	} else {
		settings = await settingRepository.find();
	}
	return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const values = await req.json();
	let data = [];
	for (let key in values) {
		data.push({
			key,
			value: values[key],
		});
	}

	for await (let row of data) {
		const records = await settingRepository
			.whereEqualTo('category', 'System')
			.whereEqualTo('name', row.key)
			.find();
		if (records && records[0]) {
			const record = records[0];
			record.value = row.value;
			await settingRepository.update(record);
		} else {
			let setting = new Setting();
			setting.category = 'System';
			setting.name = row.key;
			setting.value = row.value;
			await settingRepository.create(setting);
		}
	}

	return NextResponse.json({ error: 0 });
}
