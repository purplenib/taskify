'use client';

import { Box, ColorPicker } from '@mantine/core';

interface MyColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export default function DashboardColorPicker({
  color,
  setColor,
}: MyColorPickerProps) {
  return (
    <div className="mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg">
      <ColorPicker
        format="hex"
        value={color}
        onChange={newColor => {
          setColor(newColor);
        }}
        fullWidth
        styles={{
          body: { padding: '10px' },
          slider: {
            height: '16px',
            width: '100%',
            marginLeft: '0',
          },
          swatch: {
            margin: '0.5px',
          },
        }}
      />

      <div className="mt-4 flex items-center justify-center gap-x-4 md:gap-x-5">
        {/* 색상 팔레트 */}
        <div className="grid grid-cols-4 gap-x-2 gap-y-1 md:grid-cols-6 md:gap-x-3 md:gap-y-3">
          {[
            '#FFFFFF',
            '#FF0000',
            '#FF8000',
            '#FFFF00',
            '#64FE2E',
            '#04B431',
            '#00BFFF',
            '#0080FF',
            '#08088A',
            '#8000FF',
            '#FF0080',
            '#000000',
          ].map(swatch => (
            <Box
              key={swatch}
              className="h-9 w-9 cursor-pointer rounded border md:h-12 md:w-12 xl:h-14 xl:w-14"
              style={{ backgroundColor: swatch }}
              onClick={() => {
                setColor(swatch);
              }}
            />
          ))}
        </div>

        {/* 미리 보기 */}
        <Box
          className="h-16 w-16 rounded border border-gray-200 md:h-20 md:w-20 xl:h-24 xl:w-24"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
