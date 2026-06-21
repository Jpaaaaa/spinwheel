export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-100/30 blur-3xl" />
    </div>
  );
}
