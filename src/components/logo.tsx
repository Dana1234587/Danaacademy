import Image from 'next/image';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  // Even though we're using an Image, we can accept SVGProps for compatibility with existing code.
  // We'll extract className and pass it to the Image component.
  const { className, width = 128, height = 48 } = props;

  return (
    <Image
      src="https://i.ibb.co/wF7VPFTS/DANA-LOGO.png"
      alt="Dana Academy Logo"
      width={width}
      height={height}
      className={className}
      data-ai-hint="logo"
      priority
    />
  );
}
