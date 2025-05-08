import React, { useState } from "react";
import Image from "next/image";
const ImageWithSkeleton: React.FC<any> = ({
  src,
  alt,
  width = 600,
  height = 400,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-auto">
      {!loaded && (
        <div
          style={{ paddingTop: `${(height / width) * 100}%` }}
          className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto rounded shadow transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
