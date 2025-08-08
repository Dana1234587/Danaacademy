import Image from 'next/image';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  // Even though we're using an Image, we can accept SVGProps for compatibility with existing code.
  // We'll extract className and pass it to the Image component.
  const { className, width = 32, height = 32, ...rest } = props;

  return (
    <Image
      src="https://placehold.co/100x100.png"
      alt="Dana Academy Logo"
      width={width}
      height={height}
      className={className}
      data-ai-hint="logo"
      {...rest}
    />
  );
}
