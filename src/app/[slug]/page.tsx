import { pageRepository } from '@/collections/Page';

async function getPage(slug: string) {
	return await pageRepository.whereEqualTo('slug', slug).findOne();
}

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getPage(params.slug);

	return (
		<div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
	);
}
