import { userRepository } from '@/repositories/UserRepository';
import { cookies } from 'next/headers';
import { decrypted } from './encrypt';

export async function getSessionUser() {
	const cookieStore = cookies();
	const session = cookieStore.get('app-route');
	if (!session) {
		return null;
	}
	try {
		const userSession: any = await decrypted(session?.value);
		return JSON.parse(userSession);
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function getCurrentUser() {
	const session = await getSessionUser();
	if (!session) {
		return null;
	}
	return await userRepository.findById(session.id);
}
