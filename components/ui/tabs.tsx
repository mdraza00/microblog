import * as React from "react"
import { Tabs as RadixTabs } from "radix-ui"
import { cn } from "/lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof RadixTabs.Root>) {
  return (
    <RadixTabs.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof RadixTabs.List>) {
  return (
    <RadixTabs.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground select-none border border-border/40",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all outline-hidden cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs active:translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof RadixTabs.Content>) {
  return (
    <RadixTabs.Content
      data-slot="tabs-content"
      className={cn("outline-hidden", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
