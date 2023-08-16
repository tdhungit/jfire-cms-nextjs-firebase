import { pageRepository } from '@/collections/Page';

async function getPage(slug: string) {
	return await pageRepository.whereEqualTo('slug', slug).findOne();
}

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getPage(params.slug);

	return (
		<main
			className="min-h-screen p-0 m-0"
			dangerouslySetInnerHTML={{ __html: page?.content || '' }}
		></main>
	);
}
