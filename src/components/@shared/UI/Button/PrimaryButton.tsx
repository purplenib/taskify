import { MouseEvent, PropsWithChildren } from 'react';

import Button from './Button';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function PrimaryButton({
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <Button
      className="border border-border-gray bg-purple text-white"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
