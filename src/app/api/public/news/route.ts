import { articleCategoryRepository } from '@/collections/ArticleCategory';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const categories = await articleCategoryRepository.find();

	return NextResponse.json({ categories });
}
