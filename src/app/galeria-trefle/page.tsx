import type { Metadata } from "next";
import { DepthGallery } from "@/components/depth-gallery";

export const metadata: Metadata = {
  title: "Galeria Tréfle",
  description:
    "Galeria Tréfle em uma experiência visual conceitual com profundidade, atmosfera e curadoria espacial.",
};

export default function GaleriaTreflePage() {
  return <DepthGallery />;
}
