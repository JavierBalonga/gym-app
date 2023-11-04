import { ComponentProps } from "react";
import { cn } from "../lib/utils";

export default function Section({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("grow w-full max-w-4xl", className)} {...props}>
      {children}
    </section>
  );
}
