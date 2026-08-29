'use client';

import { FormEvent, useState } from 'react';
import type { Dict } from '@/lib/dictionary';
import { LeafLoader } from '@/components/leaf-loader';
import { useCursor } from '@/hooks/use-cursor';

export function ContactForm({ dict }: { dict: Dict }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCursorType } = useCursor();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    if (!name || !email) { 
      setError(true); 
      return; 
    }

    setLoading(true);
    // Simulate short network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSent(true);
    form.reset();
  };

  const input = 'mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15';

  if (sent) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">✓</div>
        <p className="mt-4 text-lg font-semibold">{dict.contactPage.form.success}</p>
        <p className="mt-2 text-xs text-muted-foreground">Talebiniz tarafımıza ulaşmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
        <button onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-primary hover:underline">{dict.contactPage.form.submit}</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {dict.contactPage.form.name} *
          <input name="name" required placeholder="Adınız ve Soyadınız" className={input} />
        </label>
        <label className="text-sm font-medium">
          {dict.contactPage.form.phone}
          <input name="phone" type="tel" placeholder="+90 5xx xxx xx xx" className={input} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {dict.contactPage.form.email} *
          <input name="email" type="email" required placeholder="eposta@adresiniz.com" className={input} />
        </label>
        <label className="text-sm font-medium">
          {dict.contactPage.form.projectType}
          <select name="projectType" className={input}>
            {dict.contactPage.form.projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium">
        {dict.contactPage.form.message}
        <textarea name="message" rows={5} placeholder="Projeniz veya bahçeniz hakkında detay verebilirsiniz..." className={input} />
      </label>

      {error && <p className="text-sm text-red-600 font-medium">{dict.contactPage.form.error}</p>}

      <button
        type="submit"
        disabled={loading}
        onMouseEnter={() => setCursorType('leaf')}
        onMouseLeave={() => setCursorType('default')}
        className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent-cta px-5 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
      >
        {loading ? (
          <>
            <LeafLoader size={20} className="text-white" />
            <span>Gönderiliyor...</span>
          </>
        ) : (
          dict.contactPage.form.submit
        )}
      </button>
    </form>
  );
}
