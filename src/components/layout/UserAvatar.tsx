"use client";

import { useState } from "react";

type UserAvatarProps = {
  name?: string | null;
  image?: string | null;
  className?: string;
};

function getInitials(name?: string | null): string {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

export default function UserAvatar({
  name,
  image,
  className = "h-7 w-7",
}: UserAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image!}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white`}
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
}
