// src/utils/tracking.ts
export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Captura UTMs da URL na primeira carga e persiste no sessionStorage.
 * Mantém os dados durante toda a navegação na sessão.
 */
export function captureAndPersistUtms(): void {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });
}

/**
 * Recupera as UTMs armazenadas no sessionStorage. Retorna null se ausentes.
 */
export function getStoredUtms(): UtmParams {
  if (typeof window === 'undefined') {
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null };
  }
  const utms: UtmParams = {
    utm_source: sessionStorage.getItem('utm_source'),
    utm_medium: sessionStorage.getItem('utm_medium'),
    utm_campaign: sessionStorage.getItem('utm_campaign'),
    utm_content: sessionStorage.getItem('utm_content'),
    utm_term: sessionStorage.getItem('utm_term'),
  };
  return utms;
}
