/** Código de GoatCounter, sin .goatcounter.com (ejemplo: apuntes-daws).
 *  Vacío = no se carga nada. Crea el sitio en https://www.goatcounter.com/ */
export const goatCounter = 'manuelromero'

export function goatVisitCountUrl(path = 'TOTAL') {
  return `https://${goatCounter}.goatcounter.com/counter/${path}.json`
}

export async function fetchVisitCount(path = 'TOTAL') {
  if (!goatCounter) return ''
  try {
    const res = await fetch(goatVisitCountUrl(path))
    if (!res.ok) return ''
    const data = (await res.json()) as { count?: string }
    return String(data.count ?? '')
  } catch {
    return ''
  }
}

