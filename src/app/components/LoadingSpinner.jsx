export default function LoadingSpinner({ text = "লোড হচ্ছে..." }) {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-success"></span>
      <p className="text-sm text-base-content/70">{text}</p>
    </div>
  );
}
