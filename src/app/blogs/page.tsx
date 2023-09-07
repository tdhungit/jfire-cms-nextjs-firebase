import { articleRepository } from '@/repositories/ArticleRepository';

async function getBlogs(params: any) {
	return await articleRepository.find();
}

export default async function Page() {
	const blogs = await getBlogs({});

	return <></>;
}
