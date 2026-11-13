export const MAIN_CONTENT_ID = "konten-utama";

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-strong focus:shadow-md"
    >
      Lewati ke konten utama
    </a>
  );
}
