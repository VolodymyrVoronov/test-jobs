import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface ISpinnerProps {
  className?: string;
  loaderClassName?: string;
}

const Spinner = ({ className, loaderClassName }: ISpinnerProps) => {
  return (
    <div className={className}>
      <Loader className={cn("size-8 animate-spin", loaderClassName)} />
    </div>
  );
};

export default Spinner;
