import clsx from "clsx";

export default function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        "p-3 border rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90",
        className
      )}
      {...props}
    />
  );
}
