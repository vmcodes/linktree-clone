import { useState } from 'react';
import { addNewImage } from '../../services';
import { Button, Image, Row, message } from 'antd';
import fallback from '../../assets/images/fallback.webp';
import {
  CloseOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons';

interface ImageProps {
  slug?: string;
  image?: string;
  handleAbout: Function;
}

export default function ImageUpload({ slug, image, handleAbout }: ImageProps) {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const openSelect = () => {
    const input = document.getElementById('file-upload');

    input?.click();
  };

  const selectImage = (e: any) => {
    setFile(e.target.files[0]);
    const preview = URL.createObjectURL(e.target.files[0]);

    setPreviewImage(preview);
  };

  const cancelSelect = () => {
    setPreviewImage('');
    setFile(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (file && slug) {
      await addNewImage(slug, file);
      setPreviewImage('');
      setFile(null);
      handleAbout({
        image: `https://share.socialblocks.io/${slug}-${file.name}`,
      });
      message.success('Image uploaded!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row justify="center">
        <Image
          height="150px"
          width="150px"
          alt="preview"
          src={previewImage}
          fallback={!image ? fallback : image}
          rootClassName="image-preview"
        />
      </Row>
      <br />
      <br />
      <Row justify="center">
        {!previewImage ? (
          <Button
            htmlType="button"
            style={{ marginRight: '16px' }}
            icon={<SelectOutlined />}
            onClick={openSelect}
            aria-label="Select Image"
          >
            Select
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={selectImage}
            />
          </Button>
        ) : (
          <Button
            htmlType="button"
            style={{ marginRight: '16px' }}
            icon={<CloseOutlined />}
            onClick={cancelSelect}
            aria-label="Cancel Upload"
          >
            Cancel
          </Button>
        )}

        <Button
          htmlType="submit"
          type="primary"
          icon={<UploadOutlined />}
          aria-label="Upload Image"
        >
          Upload
        </Button>
      </Row>
    </form>
  );
}
