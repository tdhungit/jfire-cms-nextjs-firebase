import { articleCategoryRepository } from '@/repositories/ArticleCategoryRepository';
import { articleRepository } from '@/repositories/ArticleRepository';
import { createDocsResponse } from '@/utils/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// all categories
	const categories = await articleCategoryRepository.find();
	// articles pagination
	const perPage = 20;
	const total = await articleRepository.count();
	let offset = 0;

	const currentPage = req.nextUrl.searchParams.get('page');
	let page: number = currentPage ? parseInt(currentPage) : 1;
	if (page > 1) {
		offset = page * perPage;
	}

	const query = articleRepository.collectionRef
		.orderBy('publishAt', 'desc')
		.offset(offset)
		.limit(perPage);

	const snapshot = await query.get();
	const articles = createDocsResponse(snapshot);

	return NextResponse.json({ categories, total, articles });
}
