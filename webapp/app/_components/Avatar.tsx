export default function Avatar({
  name,
  size = 72,
}: {
  name: string;
  size?: number;
}) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "U";

  return (
    <div
      className="mx-auto flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-extrabold ring-1 ring-black/10"
      style={{ width: size, height: size, fontSize: Math.max(16, Math.floor(size / 3)) }}
      aria-label={`Avatar for ${name}`}
      title={name}
    >
      {initials}
    </div>
  );
}