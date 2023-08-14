import { Page, pageRepository } from '@/collections/Page';
import { getSessionUser } from '@/utils/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	// detail
	const id = req.nextUrl.searchParams.get('id');
	if (id) {
		const detail = await pageRepository.findById(id);
		return NextResponse.json(detail);
	}

	// list
	const res = await pageRepository.find();
	return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const { title, slug, content, seoKeyword, seoContent } = await req.json();

	if (!title || !slug || !content) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	const page = new Page();
	page.title = title;
	page.slug = slug;
	page.content = content;
	const res = await pageRepository.create(page);
	return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const { id, title, slug, content, seoKeyword, seoContent } = await req.json();

	if (!id) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	const page = await pageRepository.findById(id);
	if (!page) {
		return NextResponse.json({ message: 'Invalid page' }, { status: 500 });
	}

	if (title) page.title = title;
	if (slug) page.slug = slug;
	if (content) page.content = content;

	const res = await pageRepository.update(page);
	return NextResponse.json(res);
}
