"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: any;
  }
}

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics = ({ trackingId }: GoogleAnalyticsProps) => {
  const currentPath = useRef('');
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const strParams = searchParams.toString() || ''
    const decodedParams = strParams ? decodeURI(strParams) : ''
    const url = decodedParams ? `${pathname}?${decodedParams}` : pathname
    currentPath.current = url
    
    if (window.gtag) {
      window.gtag('config', trackingId, {
      page_path: currentPath.current,
      });
    }

  }, [pathname, searchParams, trackingId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: '${currentPath.current}',
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
