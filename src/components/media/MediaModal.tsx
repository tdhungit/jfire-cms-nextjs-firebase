import { Modal } from 'antd';
import { useState } from 'react';
import MediaComponent from './Media';

export default function MediaModal({
	open,
	isOpen,
	onFinish,
	multiple,
}: {
	open: boolean;
	isOpen: (open: boolean) => void;
	onFinish?: (values: any) => void;
	multiple?: boolean;
}) {
	const [selected, setSelected] = useState<any>(null);

	const onSelected = (item: any) => {
		if (multiple) {
			const itemSelected = selected || [];
			setSelected([...itemSelected, item]);
		} else {
			setSelected(item);
		}
	};

	const onOk = () => {
		onFinish && onFinish(selected);
	};

	return (
		<Modal open={open} onCancel={() => isOpen(false)} onOk={onOk} width={1000}>
			<MediaComponent selected={selected || {}} onSelected={onSelected} />
		</Modal>
	);
}
