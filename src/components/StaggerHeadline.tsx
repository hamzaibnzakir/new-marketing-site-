/**
 * Splits text into words and reveals them one after another. Pure CSS
 * (see `.stagger-word` in globals.css) so it starts on first paint —
 * not after JS hydrates — and the headline is visible with JS off.
 * Screen readers get the full sentence via aria-label.
 */
export default function StaggerHeadline({
  lines,
  className,
}: {
  lines: { text: string; className?: string }[];
  className?: string;
}) {
  const label = lines.map((l) => l.text).join(" ");
  let index = 0;

  return (
    <h1 className={className} aria-label={label}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className={`block ${line.className ?? ""}`}
        >
          {line.text.split(" ").map((w, wi) => (
            <span
              key={wi}
              className="stagger-word"
              style={{ "--i": index++ } as React.CSSProperties}
            >
              {w}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
