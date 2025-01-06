import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialLoginButtonProps {
  provider: "google" | "facebook" | "apple";
  action: () => Promise<void | { error: string }>;
}

export function SocialLoginButton({
  provider,
  action,
}: SocialLoginButtonProps) {
  const providerInfo = {
    google: {
      name: "Google",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      hoverColor: "hover:bg-gray-100",
      iconPath: "/google-icon.svg",
    },
    facebook: {
      name: "Facebook",
      bgColor: "bg-[#1877F2]",
      textColor: "text-white",
      hoverColor: "hover:bg-[#0c63d4]",
      iconPath: "/facebook-icon.svg",
    },
    apple: {
      name: "Apple",
      bgColor: "bg-black",
      textColor: "text-white",
      hoverColor: "hover:bg-gray-900",
      iconPath: "/apple-icon.svg",
    },
  };

  const { name, bgColor, textColor, hoverColor, iconPath } =
    providerInfo[provider];

  const handleClick = async () => {
    const result = await action();
    if (result?.error) {
      console.error(result.error); // Handle errors in the UI
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`w-full ${bgColor} ${textColor} ${hoverColor} font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300`}
    >
      <Image
        src={iconPath}
        alt={`${name} Icon`}
        width={24}
        height={24}
        className="mr-2"
      />
      Sign in with {name}
    </Button>
  );
}