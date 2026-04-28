import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
} & HTMLAttributes<HTMLElement>;

export function Container({
  as,
  className,
  children,
  ...rest
}: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn("container-shell", className)} {...rest}>
      {children}
    </Tag>
  );
}
