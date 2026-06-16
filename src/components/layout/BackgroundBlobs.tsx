export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Light indigo-violet base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-violet-100 to-sky-200" />

      {/* Large primary blobs */}
      <div className="animate-blob-1 absolute -left-48 -top-24 h-[750px] w-[750px] rounded-full bg-indigo-500/50 blur-[80px]" />
      <div className="animate-blob-2 absolute -right-48 top-1/4   h-[700px] w-[700px] rounded-full bg-violet-500/45 blur-[75px]" />
      <div className="animate-blob-3 absolute bottom-0  left-1/4  h-[600px] w-[600px] rounded-full bg-blue-500/40  blur-[70px]" />

      {/* Accent blobs */}
      <div className="animate-blob-1 absolute -bottom-24 right-1/4 h-[450px] w-[450px] rounded-full bg-purple-400/35 blur-[65px]" />
      <div className="animate-blob-3 absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/28 blur-[60px]" />
      <div className="animate-blob-2 absolute right-1/3 top-10 h-[260px] w-[260px] rounded-full bg-fuchsia-400/25 blur-[55px]" />
    </div>
  );
}
