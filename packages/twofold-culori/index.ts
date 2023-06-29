import { parse, formatRgb, formatHsl } from 'culori';

export function color(s, args, meta) {
  if (!(s || args.name)) return;
  const c = parse(s || args.name);
  return JSON.stringify(c);
}
