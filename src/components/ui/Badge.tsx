import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "orange" | "blue" | "purple" | "green" | "gray";
  className?: string;
}

const variantClasses = {
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  gray: "bg-white/5 text-gray-400 border-white/10",
};

export default function Badge({ children, variant = "gray", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
