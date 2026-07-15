import logoAsset from "@/assets/legal-aios-logo.asset.json";

export const brandLogoUrl = logoAsset.url;

export function BrandMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 rounded-xl overflow-hidden ring-1 ring-primary/30 bg-black shadow-glow ${className}`}
      style={{ height: size, width: size }}
    >
      <img
        src={brandLogoUrl}
        alt="Industry AI OS"
        className="h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}

export function BrandLockup({
  size = 36,
  tagline = "The OS for legal.",
}: {
  size?: number;
  tagline?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <BrandMark size={size} />
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">
          Industry
        </div>
        <div className="text-sm font-semibold text-foreground -mt-0.5">AI OS</div>
        <div className="text-[10px] text-muted-foreground -mt-0.5">{tagline}</div>
      </div>
    </div>
  );
}
