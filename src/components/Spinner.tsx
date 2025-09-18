import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface ISpinnerProps {
  wrapperClassName?: string;
  loaderClassName?: string;
}

const Spinner = ({ wrapperClassName, loaderClassName }: ISpinnerProps) => {
  return (
    <div className={wrapperClassName}>
      <Loader className={cn("size-8 animate-spin", loaderClassName)} />
    </div>
  );
};

export default Spinner;
