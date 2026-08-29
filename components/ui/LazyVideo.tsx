"use client";

import { useEffect, useRef } from "react";

// Autoplaying background/cover video that does NOT download until it is near
// the viewport. The `autoPlay` attribute is deliberately absent: browsers start
// fetching the media as soon as they see it, which defeats `preload="none"` and
// made /work eagerly pull ~57–74 MB of MP4. Instead an IntersectionObserver
// calls play()/pause() as the element scrolls in and out of view.
export function LazyVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // React's `muted` attribute isn't reliably reflected onto the DOM property
    // on first render in some browsers, and an unmuted video can't autoplay.
    video.muted = true;

    // play() rejects when the browser blocks autoplay or the element is torn
    // down mid-play — the poster stays visible, which is an acceptable result.
    const play = () => {
      void video.play().catch(() => {});
    };

    // No IntersectionObserver (older browsers / non-DOM environments): fall
    // back to playing on mount, matching the previous always-on behaviour.
    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
