import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import { Button } from '@mantine/core';

import { postImage } from '@core/api/cardApis';
import getCroppedImg from '@lib/utils/getCroppedImg';

interface ImageCropperModalProps {
  imageSrc: string;
  columnId: number;
  closeCropper: () => void;
  handleImageUrlData: (imageUrl: string) => void;
}
type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export default function ImageCropperModal({
  imageSrc,
  columnId,
  closeCropper,
  handleImageUrlData,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 크롭 완료 시 호출되는 콜백 함수
  const onCropComplete = useCallback((croppedArea: Area, AreaPixels: Area) => {
    setCroppedAreaPixels(AreaPixels); // 크롭된 영역 픽셀 값을 저장
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels!);
    const formData = new FormData();
    formData.append('image', croppedImage);
    const data = await postImage(columnId, formData);
    handleImageUrlData(data.imageUrl);
    closeCropper();
  };

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={5 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="mt-5 flex h-[54px] w-full gap-2">
        <Button
          type="button"
          className="h-full grow border-gray-200 bg-white text-gray-400"
          onClick={closeCropper}
        >
          취소
        </Button>
        <Button onClick={handleSave} className="h-full grow bg-violet">
          확인
        </Button>
      </div>
    </div>
  );
}
