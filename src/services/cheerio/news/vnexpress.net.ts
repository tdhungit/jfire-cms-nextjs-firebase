import { ArticleCrawl } from '..';

class VnexpressCrawl extends ArticleCrawl {
	async saveNews(url: string, maxPage = 0) {
		this.parseListArticles(url, maxPage, 'article > h3 > a', '', {
			title: 'section.section.page-detail.top-detail > div > div.sidebar-1 > h1',
			category:
				'section.section.page-detail.top-detail > div > div.sidebar-1 > div.header-content.width_common > ul > li:nth-child(1) > a',
			description: 'section.section.page-detail.top-detail > div > div.sidebar-1 > p',
			content: 'section.section.page-detail.top-detail > div > div.sidebar-1 > article',
		});
	}
}

export default new VnexpressCrawl();
