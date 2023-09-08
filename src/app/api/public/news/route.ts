import { articleCategoryRepository } from '@/repositories/ArticleCategoryRepository';
import { articleRepository } from '@/repositories/ArticleRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// all categories
	const categories = await articleCategoryRepository.find();
	// articles pagination
	const page: any = req.nextUrl.searchParams.get('page') || 1;
	const pagination = await articleRepository.pagination({
		page: parseInt(page),
		orderBy: [
			{
				field: 'publishAt',
				direction: 'desc',
			},
		],
	});

	return NextResponse.json({ categories, ...pagination });
}
