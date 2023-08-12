import { Article, articleRepository } from '@/collections/Article';
import { getSessionUser } from '@/utils/user';
import { NextRequest, NextResponse } from 'next/server';

async function detail(id: string) {
	try {
		const res = await articleRepository.findById(id);
		return NextResponse.json(res);
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	// detail
	const id = req.nextUrl.searchParams.get('id');
	if (id) {
		return detail(id);
	}

	// list
	try {
		const res = await articleRepository.find();
		return NextResponse.json(res);
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const data = await req.json();
	if (!data.name || !data.slug || !data.content || !data.description || !data.categories) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	try {
		const article = new Article();
		article.setRecord(data);
		if (!article.userId) {
			article.userId = session.id;
		}
		const res = await articleRepository.create(article);
		return NextResponse.json(res);
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const data = await req.json();
	if (!data.id) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	try {
		const article = await articleRepository.findById(data.id);
		if (!article || !article.id) {
			return NextResponse.json({ message: 'Article not found' }, { status: 500 });
		}
		article.setRecord(data);
		if (!article.userId) {
			article.userId = session.id;
		}
		const res = articleRepository.update(article);
		return NextResponse.json(res);
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}
