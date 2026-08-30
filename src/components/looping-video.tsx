type LoopingVideoProps = {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  label: string;
  className?: string;
};

export function LoopingVideo({ mp4Src, webmSrc, poster, label, className = "" }: LoopingVideoProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return (
    <figure aria-label={label} className={`relative aspect-video w-full max-w-full overflow-hidden bg-black/5 ${className}`}>
      {poster ? <Image alt="" className="object-cover" fill sizes="100vw" src={poster} /> : null}
      {motionAllowed ? (
        <video
          aria-label={label}
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          disablePictureInPicture
          loop
          muted
          playsInline
          poster={poster}
          preload="metadata"
        >
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          <source src={mp4Src} type="video/mp4" />
        </video>
      ) : null}
    </figure>
  );
}
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
