import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in ${className}`}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:zoom-in ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader = ({ className = "", ...props }) => (
  <div className={`mb-6 space-y-2 ${className}`} {...props} />
);

export const DialogTitle = ({ className = "", ...props }) => (
  <DialogPrimitive.Title className={`text-2xl font-bold text-slate-900 ${className}`} {...props} />
);

export const DialogDescription = ({ className = "", ...props }) => (
  <DialogPrimitive.Description className={`text-sm text-slate-500 ${className}`} {...props} />
);

export const DialogFooter = ({ className = "", ...props }) => (
  <div className={`mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end ${className}`} {...props} />
);

export const DialogContentWrapper = DialogContent;
export { DialogOverlay };
