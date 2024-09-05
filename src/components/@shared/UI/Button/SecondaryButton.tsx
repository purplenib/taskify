import { MouseEvent, PropsWithChildren } from 'react';

import Button from './Button';

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function SecondaryButton({
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <Button
      type="submit"
      className="border border-border-gray"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
