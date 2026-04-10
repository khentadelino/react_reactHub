export default function TopicPill({
  label,
  small = false,
  active = false,
  onClick,
}) {
  const baseStyle = "bg-white/5 text-white/50 border-white/10";

  const activeStyle =
    "bg-white/10 text-white border-white/20 ring-1 ring-white/20";

  const sizeClass = small ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center rounded-full border font-medium transition-all duration-200 ${
        active ? activeStyle : baseStyle
      } ${sizeClass} ${onClick ? "cursor-pointer hover:bg-white/10" : ""}`}
    >
      {label}
    </span>
  );
}
