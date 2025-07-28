import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, loading = false, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.5rem] w-10 shrink-0 items-center justify-start rounded-full border border-transparent shadow-xs transition-all duration-300 ease-in-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#949494] dark:data-[state=unchecked]:bg-input/80 data-[state=checked]:justify-end disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4.5 rounded-full bg-background ring-0 transition-all duration-300 ease-in-out dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground flex items-center justify-center"
        )}
      >
        {loading && (
          <span className="animate-spin inline-block w-3 h-3 border-2 border-t-transparent border-gray-500 rounded-full" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
