/** Shared wrapper for the editorial SVG illustrations (app/public/assets/) so every
 * placement follows the same rules: informative figures get real alt text, decorative
 * ones get alt="", every figure has a stable aspect-ratio (no layout shift while it
 * loads), and a caption states plainly that this is an illustration -- never a source
 * figure or a data value -- per docs/CLAUDE_ASSET_PLACEMENT.md. */
export function Figure({
  src,
  alt,
  caption,
  maxWidth,
  aspectRatio,
  eager,
  hideOnNarrow,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxWidth: number;
  aspectRatio: string;
  eager?: boolean;
  hideOnNarrow?: boolean;
}) {
  return (
    <figure
      className={hideOnNarrow ? "hide-narrow" : undefined}
      style={{ margin: 0, maxWidth, width: "100%" }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        style={{ display: "block", width: "100%", aspectRatio, height: "auto" }}
      />
      {caption && (
        <figcaption style={{ marginTop: 6, fontSize: 11.5, color: "var(--text-muted)", fontStyle: "italic" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
