import clsx from "clsx";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "rounded-lg border bg-card-background text-white py-2 px-3 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function SelectOption({
  className,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <option
      className={clsx("p-3 border rounded-md bg-card-background", className)}
      {...props}
    />
  );
}
