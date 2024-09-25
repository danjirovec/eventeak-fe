import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { BUCKET_URL } from 'config/config';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SupaUpload = ({
  disabled,
  folder,
  incomingUrl,
  onUpload,
}: {
  disabled?: boolean;
  folder?: string;
  incomingUrl?: string;
  onUpload: (formData: FormData | null) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (incomingUrl) {
      const newFileList: UploadFile[] = [
        {
          uid: '-1',
          name: incomingUrl,
          status: 'done',
          url: `${BUCKET_URL}${folder}/${incomingUrl}`,
        },
      ];
      setFileList(newFileList);
    }
  }, [incomingUrl, folder]);

  const handleUpload = async (fileInfo: any) => {
    const { onSuccess, onError, file } = fileInfo;

    try {
      const formData = new FormData();
      formData.append('file', file);
      onUpload(formData);
      onSuccess();
      message.success('Image uploaded');
    } catch (error) {
      onError();
      message.error(`Image upload failed ${error}`);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleRemove = async () => {
    onUpload(null);
    message.info(`Image removed`);
  };

  return (
    <>
      <Upload
        disabled={disabled}
        customRequest={handleUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default SupaUpload;
