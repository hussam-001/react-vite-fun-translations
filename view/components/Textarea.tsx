import clsx from "clsx";

export default function Textarea({
  className,
  ...props
}: React.HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx("p-3 border rounded-md bg-card-background", className)}
    />
  );
}
