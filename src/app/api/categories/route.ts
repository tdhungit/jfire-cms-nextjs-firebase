import { ArticleCategory, articleCategoryRepository } from '@/collections/ArticleCategory';
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
		try {
			const cats = await articleCategoryRepository.whereEqualTo('id', id).find();
			if (cats && cats[0]) {
				return NextResponse.json(cats[0]);
			}
			return NextResponse.json({ message: 'Not found' }, { status: 404 });
		} catch (err: any) {
			return NextResponse.json({ message: err.message }, { status: 500 });
		}
	}

	// list
	try {
		const res = await articleCategoryRepository.find();
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

	const { name, slug, description } = await req.json();
	if (name && slug) {
		const cat = new ArticleCategory();
		cat.name = name;
		cat.slug = slug;
		cat.description = description || '';
		try {
			const res = await articleCategoryRepository.create(cat);
			return NextResponse.json(res);
		} catch (err: any) {
			return NextResponse.json({ message: err.message }, { status: 500 });
		}
	}
	return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
}

export async function PUT(req: NextRequest) {
	const session: any = await getSessionUser();
	if (!session) {
		return NextResponse.json({ message: 'unauthenticated' }, { status: 403 });
	}

	const { id, name, slug, description } = await req.json();
	if (!id) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	const cat = await articleCategoryRepository.findById(id);
	if (!cat || !cat.id) {
		return NextResponse.json({ message: 'Invalid params' }, { status: 500 });
	}

	if (name) cat.name = name;
	if (slug) cat.slug = slug;
	if (description) cat.description = description;

	try {
		const res = await articleCategoryRepository.update(cat);
		return NextResponse.json(res);
	} catch (err: any) {
		return NextResponse.json({ message: err.message }, { status: 500 });
	}
}
