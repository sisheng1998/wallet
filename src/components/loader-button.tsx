import React, { ElementType } from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

type LoaderButtonProps = ButtonProps & {
  icon?: LucideIcon | ElementType;
  isLoading?: boolean;
};

export const LoaderButton = React.forwardRef<
  HTMLButtonElement,
  LoaderButtonProps
>(({ icon: Icon, isLoading, children, ...props }, ref) => (
  <Button ref={ref} disabled={isLoading} {...props}>
    {isLoading ? (
      <Loader2 className="mr-2 size-4 animate-spin" />
    ) : Icon ? (
      <Icon className="mr-2 size-4" />
    ) : null}
    {children}
  </Button>
));

LoaderButton.displayName = "LoaderButton";
