import { userRepository } from '@/repositories/UserRepository';
import { encrypted } from '@/utils/encrypt';
import { NextRequest, NextResponse } from 'next/server';
import { Md5 } from 'ts-md5';

export async function GET() {
	return NextResponse.json({ message: 'authenticated' });
}

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();
	if (!email || !password) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	let md5 = new Md5();
	md5.appendStr(password);
	const hash = md5.end()?.toString() || '';

	const users = await userRepository
		.whereEqualTo('email', email)
		.whereEqualTo('password', hash)
		.find();

	if (users && users[0]) {
		const user = users[0];
		const encryptedSession = await encrypted({ id: user.id, email: user.email, roles: user.roles });
		return NextResponse.json(
			{ user },
			{ headers: { 'Set-Cookie': `app-route=${encryptedSession};Path=/` } },
		);
	}

	return NextResponse.json({ message: 'Invalid email or password' }, { status: 500 });
}
