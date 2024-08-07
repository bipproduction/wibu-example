// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Wibu Example',
  description: 'example untuk wibu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body>
        <MantineProvider defaultColorScheme='dark' >{children}</MantineProvider>
      </body>
    </html>
  );
}