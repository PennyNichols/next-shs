import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: `Schmidt's Home Services`,
  description: `Experienced handyman and construction professionals serving Florida's Port Charlotte / Punta Gorda / North Port / Englewood. We offer reliable service and quality workmanship for all your home improvement projects. Contact us today!`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
