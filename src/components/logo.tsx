
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="currentColor"
      {...props}
    >
      <path
        d="M100 18a82 82 0 100 164 82 82 0 000-164zm0 152a70 70 0 110-140 70 70 0 010 140z"
        fill="#6E3F7D"
      />
      <path
        d="M100 75a25 25 0 100 50 25 25 0 000-50zm0 40a15 15 0 110-30 15 15 0 010 30z"
        fill="#6E3F7D"
      />
      <path
        d="M50 155c0-8.2 6.8-15 15-15h70c8.2 0 15 6.8 15 15s-6.8 15-15 15H65c-8.2 0-15-6.8-15-15z"
        fill="black"
      />
      <path
        d="M20 150h160v10H20z"
        fill="black"
      />
      <path
        d="M100 5l50 25-50 25-50-25L100 5z"
        fill="black"
      />
      <path
        d="M95 100a5 5 0 1110 0v15a5 5 0 11-10 0v-15z"
        fill="#6E3F7D"
      />
    </svg>
  );
}
