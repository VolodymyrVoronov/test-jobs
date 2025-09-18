import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="border-b">
      <div className="px-2 flex flex-row items-center justify-between max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
