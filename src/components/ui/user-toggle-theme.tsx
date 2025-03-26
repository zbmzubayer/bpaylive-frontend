import { useTheme } from "next-themes";
import { Button, ButtonProps } from "@heroui/button";
import { MdLightMode } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";

export function UserToggleTheme({ ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!theme) return null;

  return (
    <Button aria-label="Toggle theme" isIconOnly onPress={handleToggleTheme} {...props}>
      {theme === "light" ? (
        <>
          <MdLightMode className="size-5 fill-yellow-500" />
          <span className="sr-only">Light theme</span>
        </>
      ) : (
        <>
          <RiMoonClearFill className="size-5" />
          <span className="sr-only">Dark theme</span>
        </>
      )}
    </Button>
  );
}
