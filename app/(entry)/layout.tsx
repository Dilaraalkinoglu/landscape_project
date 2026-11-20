import '../globals.css';
import '../local-fonts.css';

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><body className="font-sans antialiased">{children}</body></html>;
}
