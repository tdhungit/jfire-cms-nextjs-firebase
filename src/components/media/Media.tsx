import { Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import ListComponent from './ListComponent';
import UploadComponent from './UploadComponent';

export default function MediaComponent({
	selected,
	onSelected,
}: {
	selected?: any;
	onSelected: (item: any) => void;
}) {
	const [activeKey, setActiveKey] = useState('list');
	const [refresh, setRefresh] = useState(0);

	const items: TabsProps['items'] = [
		{
			key: 'list',
			label: `All`,
			children: (
				<ListComponent refresh={refresh} selected={selected || {}} onSelected={onSelected} />
			),
		},
		{
			key: 'upload',
			label: `Upload`,
			children: (
				<UploadComponent
					onFinish={() => {
						setActiveKey('list');
						setRefresh(refresh + 1);
					}}
				/>
			),
		},
	];

	const onChange = (key: string) => {
		setActiveKey(key);
	};

	return <Tabs defaultActiveKey="list" activeKey={activeKey} items={items} onChange={onChange} />;
}
