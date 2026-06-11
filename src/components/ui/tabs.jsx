import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={`space-y-4 ${className}`} {...props} />
));
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-1 text-slate-600 ${className}`}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm hover:text-slate-900 ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${className}`} {...props} />
));
TabsContent.displayName = "TabsContent";
