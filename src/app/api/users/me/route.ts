import { getCurrentUser } from '@/utils/user';
import { NextResponse } from 'next/server';

export async function GET() {
	const user = await getCurrentUser();
	if (!user || !user.id) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 500 });
	}
	return NextResponse.json({ ...user, password: '' });
}
