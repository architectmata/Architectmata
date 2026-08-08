import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  id?: string;
}>;

export function Reveal({ children, className, delay = 0, id }: RevealProps) {
  return (
    <div
      id={id}
      className={`reveal ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
