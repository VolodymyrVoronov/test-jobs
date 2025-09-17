import type { Theme } from "@/types";

export const applyTheme = (theme: Theme): void => {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);

    return;
  }

  root.classList.add(theme);
};

export function findScrollableDescendant(
  root: Element | null
): HTMLElement | null {
  if (!root) return null;

  const queue: Element[] = [root];

  while (queue.length) {
    const el = queue.shift()!;

    if (el instanceof HTMLElement) {
      // treat as scrollable if it can scroll vertically
      if (el.scrollHeight > el.clientHeight) return el;
    }

    queue.push(...Array.from(el.children));
  }

  return null;
}
