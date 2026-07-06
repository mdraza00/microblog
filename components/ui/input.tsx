import * as React from "react"
import { cn } from "/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm shadow-2xs transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
