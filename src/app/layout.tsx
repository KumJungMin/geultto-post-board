import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from './lib/registry'
import "./globals.css";

export const metadata: Metadata = {
  title: "글또 글 검색 사이트",
  description: "글또에 제출된 여러 글을 검색할 수 있는 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </html>
  );
}
