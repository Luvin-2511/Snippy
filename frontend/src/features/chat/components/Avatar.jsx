const Avatar = ({ name, color, online, size = "h-14 w-14", text = "text-lg" }) => (
  <div className="relative shrink-0">
    <div className={`${size} ${text} flex items-center justify-center rounded-full bg-gradient-to-br ${color} font-semibold uppercase text-white`}>
      {name[0]}
    </div>
    {online && (
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0f14] bg-emerald-500" />
    )}
  </div>
);

export default Avatar;