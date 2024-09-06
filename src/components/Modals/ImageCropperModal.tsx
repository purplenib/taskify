import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

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
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  // 크롭 완료 시 호출되는 콜백 함수
  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels); // 크롭된 영역 픽셀 값을 저장
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedArea!);
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
      <button onClick={handleSave}>이미지 등록하기</button>
    </div>
  );
}
