"use client";

/**
 * ThemeProvider — wraps the app with next-themes for dark/light mode support.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
