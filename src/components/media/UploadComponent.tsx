import { PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import { useState } from 'react';

export default function UploadComponent({ onFinish }: { onFinish: () => void }) {
	const [images, setImages] = useState<any>([]);

	const onUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setImages(newFileList);
		onFinish();
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload Image</div>
		</div>
	);

	return (
		<div className="container">
			<Upload action="/api/media" listType="picture-card" fileList={images} onChange={onUpload}>
				{uploadButton}
			</Upload>
		</div>
	);
}
