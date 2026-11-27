export function AccountDetailList({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={
            index === 0
              ? "rounded-2xl border border-slate-100 p-4 sm:col-span-2"
              : "rounded-2xl border border-slate-100 p-4"
          }
        >
          <dt className="text-xs text-muted">{item.label}</dt>
          <dd className="mt-1 font-heading text-sm font-medium break-words text-ink">
            {item.value || "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
