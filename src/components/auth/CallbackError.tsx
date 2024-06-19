"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@/hooks/useRouter";
import { useToast } from "@/components/ui/use-toast";

const CallbackError = () => {
  const { toast } = useToast();
  const { replace } = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "";

  useEffect(() => {
    if (!error) return;

    const timeout = setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });

      replace(pathname);
    }, 0);

    return () => clearTimeout(timeout);
  }, [error, toast, replace, pathname]);

  return null;
};

export default CallbackError;
