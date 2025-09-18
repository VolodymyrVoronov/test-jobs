import "@fontsource/bangers/400.css";

import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="border-b px-2 flex flex-row items-center justify-between max-w-full">
      <h1
        className="text-2xl font-bold"
        style={{
          fontFamily: "Bangers, cursive, system-ui",
        }}
      >
        Jobs
      </h1>

      <ThemeSwitcher />
    </header>
  );
};

export default Header;
