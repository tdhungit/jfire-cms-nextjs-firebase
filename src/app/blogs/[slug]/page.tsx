import { articleRepository } from '@/repositories/ArticleRepository';

async function getBlog(slug: string) {
	if (slug) {
		return await articleRepository.whereEqualTo('slug', slug).findOne();
	}
	return {};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const blog: any = await getBlog(params?.slug);

	return (
		<div className="container">
			{blog && (
				<div className="w-full p-8">
					<h3 className="text-2xl">{blog.name}</h3>
					<div className="w-full">
						<div className="pt-8" dangerouslySetInnerHTML={{ __html: blog?.content || '' }}></div>
					</div>
				</div>
			)}
		</div>
	);
}
