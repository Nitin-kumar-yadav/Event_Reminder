import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
    );
};

export default ThemeToggle;
