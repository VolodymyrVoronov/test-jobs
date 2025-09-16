import { Laptop, type LucideProps, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import type { RootState } from "@/store/store";
import { setTheme } from "@/store/themeSlice";
import type { Theme } from "@/types";

const themes: {
  name: Theme;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  { name: "light", icon: Sun },
  { name: "dark", icon: Moon },
  { name: "system", icon: Laptop },
] as const;

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const onThemeChange = (theme: Theme): void => {
    dispatch(setTheme(theme));
  };

  return (
    <div className="flex items-center gap-1">
      {themes.map((t) => (
        <button
          key={t.name}
          className={cn(
            "relative flex size-7 items-center justify-center ring-0 outline-none hover:cursor-pointer focus-visible:ring-1"
          )}
          onClick={() => onThemeChange(t.name)}
          title={t.name}
        >
          <span className="sr-only">{t.name}</span>
          <t.icon className="size-5" />
          {theme === t.name && (
            <motion.div
              layoutId="selected-theme"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-muted absolute -z-10 size-full rounded-sm"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
