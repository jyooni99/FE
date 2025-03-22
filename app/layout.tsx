import '~/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

const APP_NAME = 'Quick Network';
const APP_DEFAULT_TITLE = 'Quick Network';
const APP_TITLE_TEMPLATE = '%s - QuickNetwork';
const APP_DESCRIPTION =
  '대규모 IT 행사 참가자를 위한 즉석 네트워킹 및 온라인 명함 교환 서비스';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen bg-bg-color">
        <div className="min-h-screen w-full max-w-3xl mx-auto bg-bg-color">
          {children}
          <Script src="/service-worker.js" />
        </div>
      </body>
    </html>
  );
}
