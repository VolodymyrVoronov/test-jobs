import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="py-1 px-2 flex flex-row items-center justify-between max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Jobs</h1>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
