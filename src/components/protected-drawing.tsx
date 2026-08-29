"use client";

type ProtectedDrawingProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ProtectedDrawing({ src, alt, caption }: ProtectedDrawingProps) {
  return (
    <figure
      className="protected-drawing"
      onContextMenu={(event) => event.preventDefault()}
      aria-label={caption}
    >
      <div className="protected-drawing-frame" aria-hidden>
        <div
          className="protected-drawing-image"
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={alt}
        />
        <div className="protected-drawing-watermark">
          (c) Manasi Chaudhari / Architectmata
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
