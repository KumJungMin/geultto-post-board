import type { Metadata } from "next";
import { Suspense } from 'react';

import StyledComponentsRegistry from './lib/registry'
import GoogleAnalytics from './components/common/GoogleAnalytics';

import "./globals.css";
import { Noto_Sans_KR, Noto_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: "글또 글 검색 사이트",
  description: "글또에 제출된 여러 글을 검색할 수 있는 사이트입니다.",
};

const notoKR = Noto_Sans_KR({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const notoSans = Noto_Sans({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
  const startGA = process.env.NEXT_PUBLIC_ENV !== 'development' && trackingId
  
  return (
    <html lang="kr">
      <body className={`${notoKR} ${notoSans}`}>
        <Suspense>
          {startGA && <GoogleAnalytics trackingId={trackingId} />}
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}
