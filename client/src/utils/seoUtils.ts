/**
 * SEO utility helpers.
 * Created on 2026-01-12.
 * Add your functions here.
 */

export const setTitle = (title: string): void => {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
};

export const setMeta = (name: string, content: string): void => {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export default {
  setTitle,
  setMeta,
};
