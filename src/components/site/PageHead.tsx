import type { ReactNode } from "react";

export function PageHead({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{`< ${label} />`}</p>
      <h1 className="mt-3 text-4xl leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
        {children}
      </h1>
    </div>
  );
}
