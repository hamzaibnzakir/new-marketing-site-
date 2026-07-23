import type { ReactNode } from "react";

/**
 * Wraps children in a border with a rotating gradient "beam" chasing
 * around the edge — hand-coded with a conic-gradient + CSS @property
 * animation (registered in globals.css), not a copy-pasted component.
 */
export default function BorderBeam({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-beam relative p-[1.5px] ${className}`}>
      <div className="relative bg-black">{children}</div>
    </div>
  );
}
