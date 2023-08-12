import { request } from '@/utils/request';
import { useRequest } from 'ahooks';
import { useState } from 'react';

export default function ListComponent({
	refresh,
	selected,
	multiple,
	onSelected,
}: {
	refresh: number;
	selected?: any;
	multiple?: boolean;
	onSelected: (item: any) => void;
}) {
	const { data: listMedia } = useRequest(() => request({ url: '/api/media' }), {
		refreshDeps: [refresh],
	});

	const [fileSelected, setFileSelected] = useState<any>({});

	const onClick = (item: any) => {
		if (multiple) {
			setFileSelected({ ...fileSelected, [item.id]: item });
		} else {
			setFileSelected({ [item.id]: item });
		}
		onSelected(item);
	};

	const fileClassName =
		'block border-2 border-solid border-black p-2 rounded-lg hover:border-yellow-500';
	const fileActiveClassName =
		'block border-2 border-solid border-yellow-500 p-2 rounded-lg hover:border-yellow-500';

	return (
		<div className="container">
			<div className="grid grid-cols-7 gap-4">
				{listMedia &&
					listMedia.length > 0 &&
					listMedia.map((item: any) => (
						<div key={item.id} className="w-32">
							<a
								onClick={() => onClick(item)}
								className={fileSelected[item.id] ? fileActiveClassName : fileClassName}
							>
								<img src={item.url} style={{ maxWidth: '100%', maxHeight: 100 }} />
							</a>
						</div>
					))}
			</div>
		</div>
	);
}
