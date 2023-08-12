import { sealData, unsealData } from 'iron-session';

export async function encrypted(data: any) {
	return await sealData(JSON.stringify(data), {
		password: process.env.COOKIE_SECRET || 'jfire-cms',
	});
}

export async function decrypted(str: any) {
	return await unsealData(str, {
		password: process.env.COOKIE_SECRET || 'jfire-cms',
	});
}
