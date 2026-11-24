"use client";

import Image from "next/image";
import { useState } from "react";
import { BookPlaceholderIcon } from "./Icons";

interface BookCoverImageProps {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fallbackText?: string;
  iconClassName?: string;
  fallbackClassName?: string;
}

export default function BookCoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  fallbackText = "No Cover",
  iconClassName = "mb-1.5 h-8 w-8 stroke-current",
  fallbackClassName = "flex h-full w-full flex-col items-center justify-center rounded-md bg-zinc-100 p-3 text-center text-zinc-400 shadow-sm",
}: BookCoverImageProps) {
  const [imageError, setImageError] = useState(false);
  const validSrc = typeof src === "string" && src.trim().length > 0 ? src : null;

  if (validSrc && !imageError) {
    return (
      <Image
        src={validSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className={fallbackClassName}>
      <BookPlaceholderIcon className={iconClassName} />
      <span className="text-xs font-medium leading-tight">{fallbackText}</span>
    </div>
  );
}
