
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200",
        ghost: "border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
      },
      state: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      }
    },
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants> {
  state?: "default" | "error" | "success";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, state, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, state, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
