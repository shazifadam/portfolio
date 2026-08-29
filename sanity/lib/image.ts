import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// `.auto("format")` is applied centrally so every call site gets WebP/AVIF
// content negotiation from the CDN (covers were shipping as 1.3–1.6 MB PNGs).
// The builder still chains — .width()/.height()/.fit()/.quality()/.url().
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
