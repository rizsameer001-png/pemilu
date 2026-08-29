export function formatVoterId(voterId?: string): string {
  if (!voterId) return 'N/A';
  return voterId.toUpperCase().trim();
}

export function formatPhoneNumber(phone?: string): string {
  if (!phone) return '—';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone;
}

export function formatCompactNumber(num?: number): string {
  if (num === undefined || num === null) return '0';
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toLocaleString();
}
