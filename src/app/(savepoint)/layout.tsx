import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './savepoint/savepoint.css';
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
export const metadata: Metadata = { title: 'SAVEPOINT. — Every cartridge holds a world.', description: 'Ten strange little universes. One console. An interactive archive of imaginary games.', icons: { icon: '/templates/savepoint/icon.svg' } };
export const viewport: Viewport = { themeColor: '#121419', width: 'device-width', initialScale: 1 };
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}><body>{children}</body></html>; }
