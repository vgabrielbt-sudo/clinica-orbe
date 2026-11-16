// Gera as imagens ilustradas (webp) usadas no site. Para trocar por fotos reais,
// substitua os arquivos em site/assets/img mantendo os nomes (800 e tamanho cheio).
import sharp from 'sharp';
import fs from 'node:fs';

const OUT = new URL('../site/assets/img/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const P = {
  cream: '#F4EEE3', sand: '#E4D8C3', sand2: '#D2C0A0', stone: '#C4B08A',
  olive: '#586140', oliveD: '#3E452B', oliveL: '#8A9168',
  brown: '#4B3526', brownL: '#7A5A40', graph: '#262420', graphL: '#4A463F',
};

const archPath = (x, y, w, h) =>
  `M${x},${y + h} L${x},${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} L${x + w},${y + h} Z`;

const svg = (w, h, inner, seed = 3, grain = 0.16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .25  0 0 0 0 .2  0 0 0 0 .14  0 0 0 1.1 -.35"/></filter>
<filter id="bl"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="bl2"><feGaussianBlur stdDeviation="8"/></filter>
</defs>${inner}<rect width="${w}" height="${h}" filter="url(#gr)" opacity="${grain}"/></svg>`;

const lg = (id, c1, c2, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
const rg = (id, c1, c2, cx = .5, cy = .5, r = .5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`;

const scenes = {};

// ---------- ambientes ----------
scenes.hero = [1200, 1500, () => svg(1200, 1500, `
<defs>${lg('w', P.sand, P.cream)}${lg('sky', '#FBF6EA', '#EBDDC3')}${lg('fl', '#D9C9AA', '#BBA680')}${rg('orb', P.brownL, P.brown, .35, .3, .8)}</defs>
<rect width="1200" height="1500" fill="url(#w)"/>
<path d="${archPath(230, 170, 740, 1060)}" fill="${P.sand2}"/>
<path d="${archPath(280, 220, 640, 1010)}" fill="url(#sky)"/>
<path d="${archPath(280, 220, 640, 1010)}" fill="none" stroke="${P.stone}" stroke-width="3" opacity=".6"/>
<rect x="0" y="1230" width="1200" height="270" fill="url(#fl)"/>
${[1290, 1350, 1430].map(y => `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="${P.brown}" stroke-opacity=".1" stroke-width="2"/>`).join('')}
<polygon points="330,1230 870,1230 1130,1500 100,1500" fill="#fff" opacity=".3" filter="url(#bl)"/>
<ellipse cx="760" cy="1385" rx="150" ry="22" fill="${P.graph}" opacity=".22" filter="url(#bl2)"/>
<circle cx="760" cy="1270" r="118" fill="url(#orb)"/>
<ellipse cx="305" cy="1370" rx="90" ry="14" fill="${P.graph}" opacity=".25" filter="url(#bl2)"/>
<path d="M255,1370 Q250,1250 275,1200 L335,1200 Q360,1250 355,1370 Z" fill="${P.graph}"/>
${[[-40, 150], [0, 240], [30, 190], [-20, 100], [55, 120]].map(([dx, h], i) => `<path d="M305,1205 Q${305 + dx},${1205 - h / 2} ${305 + dx * 1.6},${1205 - h}" stroke="${P.oliveD}" stroke-width="5" fill="none"/><ellipse cx="${305 + dx * 1.6}" cy="${1205 - h - 20}" rx="26" ry="62" transform="rotate(${dx} ${305 + dx * 1.6} ${1205 - h})" fill="${i % 2 ? P.olive : P.oliveL}"/>`).join('')}
`, 5)];

scenes.recepcao = [1600, 1000, () => svg(1600, 1000, `
<defs>${lg('w', '#8A6A4C', '#5B4230')}${lg('fl', '#CDBB98', '#B6A17A')}${lg('ct', '#EFE6D3', '#D8C9AA')}${rg('lamp', '#FFF3D6', 'rgba(255,243,214,0)', .5, .5, .5)}</defs>
<rect width="1600" height="1000" fill="${P.sand}"/>
<rect x="0" y="0" width="1000" height="760" fill="url(#w)"/>
${Array.from({ length: 50 }, (_, i) => `<rect x="${i * 20}" y="0" width="${8 + (i % 3) * 3}" height="760" fill="${i % 4 === 0 ? '#3F2D20' : i % 3 === 0 ? '#9A785A' : '#6E513A'}" opacity=".55"/>`).join('')}
<rect x="1000" y="0" width="600" height="760" fill="${P.cream}"/>
<path d="${archPath(1120, 120, 360, 640)}" fill="#F9F2E2"/>
<rect x="0" y="760" width="1600" height="240" fill="url(#fl)"/>
${[240, 560, 820].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="230" stroke="${P.graph}" stroke-width="3"/><circle cx="${x}" cy="270" r="60" fill="url(#lamp)" opacity=".9"/><circle cx="${x}" cy="270" r="34" fill="#FFF6E2"/>`).join('')}
<path d="M120,830 L120,610 Q120,560 170,560 L860,560 Q910,560 910,610 L910,830 Z" fill="url(#ct)"/>
<rect x="100" y="820" width="830" height="26" fill="${P.graph}" opacity=".16" filter="url(#bl2)"/>
<rect x="190" y="520" width="200" height="40" rx="6" fill="${P.olive}"/>
<circle cx="1290" cy="690" r="70" fill="${P.brown}"/><rect x="1288" y="690" width="4" height="100" fill="${P.graph}"/>
<ellipse cx="1290" cy="810" rx="100" ry="14" fill="${P.graph}" opacity=".25" filter="url(#bl2)"/>
`, 7)];

scenes.consultorio = [1600, 1100, () => svg(1600, 1100, `
<defs>${lg('w', P.cream, P.sand)}${lg('lt', 'rgba(255,248,230,.9)', 'rgba(255,248,230,0)')}${lg('fl', '#C9B590', '#A8946E')}</defs>
<rect width="1600" height="1100" fill="url(#w)"/>
${[130, 560, 990].map(x => `<path d="${archPath(x, 100, 330, 760)}" fill="#FBF5E6"/><path d="${archPath(x, 100, 330, 760)}" fill="none" stroke="${P.sand2}" stroke-width="10"/>`).join('')}
<rect y="860" width="1600" height="240" fill="url(#fl)"/>
${[130, 560, 990].map((x, i) => `<polygon points="${x + 20},860 ${x + 310},860 ${x + 520 + i * 30},1100 ${x - 150 + i * 30},1100" fill="#fff" opacity=".25" filter="url(#bl)"/>`).join('')}
<path d="M1210,880 Q1210,700 1330,690 Q1450,700 1450,880 Z" fill="${P.olive}"/>
<rect x="1320" y="880" width="20" height="120" fill="${P.graph}"/>
<ellipse cx="1330" cy="1005" rx="90" ry="12" fill="${P.graph}" opacity=".3"/>
<circle cx="800" cy="760" r="64" fill="${P.brown}"/><ellipse cx="800" cy="880" rx="90" ry="12" fill="${P.graph}" opacity=".25" filter="url(#bl2)"/>
`, 9)];

scenes.materiais = [1200, 1200, () => svg(1200, 1200, `
<defs>${rg('a', '#E6D9BC', '#C9B68E', .4, .35, .9)}${rg('b', '#9A785A', '#5B4230', .4, .35, .9)}${rg('c', '#7C8559', '#3E452B', .4, .35, .9)}${rg('d', '#4A463F', '#1E1C19', .4, .35, .9)}</defs>
<rect width="1200" height="1200" fill="${P.cream}"/>
<rect x="60" y="60" width="500" height="500" rx="250" fill="url(#a)"/>
<rect x="640" y="60" width="500" height="500" rx="26" fill="url(#b)"/>
${Array.from({ length: 24 }, (_, i) => `<rect x="${640 + i * 21}" y="60" width="6" height="500" fill="#2F2118" opacity=".25"/>`).join('')}
<rect x="60" y="640" width="500" height="500" rx="26" fill="url(#c)"/>
<path d="${archPath(640, 640, 500, 500)}" fill="url(#d)"/>
`, 11)];

scenes.corredor = [1400, 1800, () => svg(1400, 1800, `
<defs>${lg('w', P.sand, P.sand2)}</defs>
<rect width="1400" height="1800" fill="url(#w)"/>
${[0, 1, 2, 3, 4, 5].map(i => { const s = 1 - i * .16, w = 1100 * s, x = 700 - w / 2, y = 150 + i * 120, h = 1300 * s + i * 4; const tones = ['#BDA880', '#CDBA95', '#D9C9A8', '#E5D8BE', '#F0E7D2', '#F9F3E4']; return `<path d="${archPath(x, y, w, h)}" fill="${tones[i]}"/>`; }).join('')}
<rect y="1450" width="1400" height="350" fill="#B9A47D"/>
<polygon points="520,1450 880,1450 1180,1800 220,1800" fill="#fff" opacity=".3" filter="url(#bl)"/>
<circle cx="700" cy="900" r="46" fill="${P.brown}"/>
`, 13)];

scenes.espera = [1600, 1000, () => svg(1600, 1000, `
<defs>${lg('w', '#6E7650', '#4A5231')}${lg('fl', '#C8B590', '#A99468')}${rg('sun', '#FFF2D0', 'rgba(255,242,208,0)', .5, .5, .5)}</defs>
<rect width="1600" height="1000" fill="url(#w)"/>
<circle cx="1180" cy="330" r="260" fill="url(#sun)"/><circle cx="1180" cy="330" r="150" fill="#F6ECD2"/>
<rect y="760" width="1600" height="240" fill="url(#fl)"/>
<path d="M190,760 Q190,640 300,640 L760,640 Q870,640 870,760 L870,800 L190,800 Z" fill="${P.sand}"/>
<rect x="190" y="800" width="680" height="40" rx="10" fill="${P.sand2}"/>
<ellipse cx="530" cy="860" rx="360" ry="16" fill="${P.graph}" opacity=".25" filter="url(#bl2)"/>
<circle cx="1050" cy="800" r="70" fill="${P.brown}"/><rect x="980" y="800" width="140" height="14" fill="${P.graph}"/>
<ellipse cx="1050" cy="880" rx="110" ry="12" fill="${P.graph}" opacity=".25" filter="url(#bl2)"/>
`, 15)];

scenes.detalhe = [1200, 1500, () => svg(1200, 1500, `
<defs>${lg('w', '#E8DCC4', '#CDBB98', 1, 0)}${lg('sh', 'rgba(38,36,32,.5)', 'rgba(38,36,32,0)', 1, 0)}</defs>
<rect width="1200" height="1500" fill="url(#w)"/>
<path d="M0,0 L520,0 Q820,750 520,1500 L0,1500 Z" fill="${P.sand2}"/>
<path d="M520,0 Q820,750 520,1500 L760,1500 Q1060,750 760,0 Z" fill="url(#sh)"/>
<circle cx="880" cy="520" r="190" fill="${P.cream}" opacity=".85"/>
<rect x="0" y="1250" width="1200" height="250" fill="#BBA680" opacity=".7"/>
`, 17)];

scenes.entrada = [1600, 1000, () => svg(1600, 1000, `
<defs>${lg('s', '#EFE7D6', '#D9CBAA')}${lg('d', '#FFF1CF', '#E8C98E')}</defs>
<rect width="1600" height="1000" fill="url(#s)"/>
<rect x="260" y="150" width="1080" height="650" fill="${P.graph}"/>
<path d="${archPath(650, 270, 300, 530)}" fill="url(#d)"/>
<rect x="0" y="800" width="1600" height="200" fill="#CFBD99"/>
${[0, 1, 2].map(i => `<rect x="${560 - i * 60}" y="${800 + i * 55}" width="${480 + i * 120}" height="22" fill="#E8DCC2" opacity=".9"/>`).join('')}
<circle cx="440" cy="560" r="12" fill="${P.sand}"/><circle cx="1160" cy="560" r="12" fill="${P.sand}"/>
<polygon points="650,800 950,800 1100,1000 500,1000" fill="#FFF1CF" opacity=".35" filter="url(#bl)"/>
`, 19)];

// ---------- retratos demonstrativos ----------
const portrait = (bg1, bg2, fig, seed) => [900, 1100, () => svg(900, 1100, `
<defs>${lg('b', bg1, bg2)}</defs>
<rect width="900" height="1100" fill="${bg2}"/>
<path d="${archPath(100, 90, 700, 1010)}" fill="url(#b)"/>
<ellipse cx="450" cy="1090" rx="320" ry="20" fill="${P.graph}" opacity=".2" filter="url(#bl2)"/>
<circle cx="450" cy="520" r="112" fill="${fig}"/>
<path d="M170,1100 C170,830 290,700 450,700 C610,700 730,830 730,1100 Z" fill="${fig}"/>
`, seed)];
scenes['equipe-helena'] = portrait('#F1E6CF', '#D9C9A8', P.brownL, 21);
scenes['equipe-tomas'] = portrait('#8F9770', '#6E7650', '#2F3320', 23);
scenes['equipe-marina'] = portrait('#E9D8BB', '#CDB78E', P.olive, 25);
scenes['equipe-caio'] = portrait('#6A5039', '#4B3526', '#D9C9A8', 27);
scenes['equipe-livia'] = portrait('#F4EEE3', '#E0D2B8', P.graphL, 29);

// ---------- especialidades (composições distintas) ----------
scenes.ortodontia = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', P.cream, P.sand)}</defs><rect width="1400" height="1000" fill="url(#w)"/>
<path d="M120,760 Q700,200 1280,760" stroke="${P.stone}" stroke-width="3" fill="none"/>
${Array.from({ length: 11 }, (_, i) => { const t = i / 10, x = 120 + t * 1160, y = 760 - Math.sin(t * Math.PI) * 400 * .78 - 40; const r = 28 + Math.sin(t * Math.PI) * 38; const c = [P.olive, P.brown, P.sand2, P.oliveL][i % 4]; return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><ellipse cx="${x}" cy="${y + r + 30}" rx="${r}" ry="6" fill="${P.graph}" opacity=".15"/>`; }).join('')}
<rect y="820" width="1400" height="180" fill="#CDBB98" opacity=".6"/>
`, 31)];
scenes.implantodontia = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', '#E6DAC2', '#CDBB98')}${lg('c', '#F2EADA', '#BBA680', 1, 0)}</defs><rect width="1400" height="1000" fill="url(#w)"/>
<path d="${archPath(430, 110, 540, 900)}" fill="${P.graph}"/>
<rect x="640" y="250" width="120" height="560" fill="url(#c)"/>
${Array.from({ length: 9 }, (_, i) => `<rect x="${630 - (i % 2) * 2}" y="${300 + i * 56}" width="140" height="10" rx="5" fill="${P.sand2}"/>`).join('')}
<rect x="590" y="810" width="220" height="40" fill="${P.sand}"/>
<rect y="850" width="1400" height="150" fill="#B9A47D"/>
`, 33)];
scenes.estetica = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', P.cream, '#EADFC8')}</defs><rect width="1400" height="1000" fill="url(#w)"/>
<path d="${archPath(330, 140, 420, 860)}" fill="${P.olive}" opacity=".85"/>
<path d="${archPath(560, 140, 420, 860)}" fill="${P.brown}" opacity=".6"/>
<path d="${archPath(790, 140, 420, 860)}" fill="${P.sand2}" opacity=".8"/>
<rect y="880" width="1400" height="120" fill="#C9B58C"/>
`, 35)];
scenes.clareamento = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', '#F9F2E1', '#E6D8B9')}${rg('s', '#FFFDF4', 'rgba(255,253,244,0)', .5, .5, .5)}</defs><rect width="1400" height="1000" fill="url(#w)"/>
<circle cx="700" cy="560" r="480" fill="url(#s)"/><circle cx="700" cy="560" r="210" fill="#FFFBEE"/>
<rect y="700" width="1400" height="300" fill="${P.sand2}"/><rect y="700" width="1400" height="3" fill="${P.stone}"/>
<ellipse cx="700" cy="780" rx="250" ry="18" fill="#fff" opacity=".6" filter="url(#bl2)"/>
`, 37)];
scenes.endodontia = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', '#4A463F', '#262420')}${lg('l', '#FFE9B5', '#E2B965')}</defs><rect width="1400" height="1000" fill="url(#w)"/>
<rect x="0" y="0" width="1400" height="1000" fill="${P.graph}"/>
<path d="M610,0 L790,0 L760,1000 L640,1000 Z" fill="url(#l)"/>
<polygon points="640,1000 760,1000 1100,1000 300,1000" fill="#fff" opacity=".12"/>
<circle cx="700" cy="640" r="260" fill="${P.sand}" opacity=".08"/>
`, 39, .22)];
scenes['clinica-geral'] = [1400, 1000, () => svg(1400, 1000, `
<defs>${lg('w', P.sand, P.cream)}</defs><rect width="1400" height="1000" fill="url(#w)"/>
${Array.from({ length: 24 }, (_, i) => { const c = i % 6, r = Math.floor(i / 6), lit = i === 8; return `<rect x="${140 + c * 190}" y="${90 + r * 210}" width="170" height="190" rx="${lit ? 85 : 8}" fill="${lit ? '#FFF6DC' : [P.sand2, '#CDB993', P.oliveL, '#BFA97F'][(c + r) % 4]}" opacity="${lit ? 1 : .8}"/>`; }).join('')}
`, 41)];

scenes.og = [1200, 630, () => svg(1200, 630, `
<defs>${lg('w', P.cream, P.sand)}${rg('o', P.brownL, P.brown, .35, .3, .8)}</defs><rect width="1200" height="630" fill="url(#w)"/>
<path d="${archPath(780, 70, 330, 600)}" fill="${P.olive}"/><circle cx="945" cy="470" r="70" fill="url(#o)"/>
<text x="80" y="330" font-family="Georgia, serif" font-size="150" fill="${P.graph}">Orbe</text>
<text x="86" y="400" font-family="Arial, sans-serif" font-size="30" letter-spacing="6" fill="${P.brown}">CLÍNICA ODONTOLÓGICA</text>
<text x="86" y="560" font-family="Arial, sans-serif" font-size="22" fill="${P.brownL}">Projeto demonstrativo · VT Sites</text>
`, 43, .1)];

for (const [name, [w, h, make]] of Object.entries(scenes)) {
  const buf = Buffer.from(make());
  if (name === 'og') {
    await sharp(buf).jpeg({ quality: 88 }).toFile(`${OUT}${name}.jpg`);
    continue;
  }
  await sharp(buf).webp({ quality: 80 }).toFile(`${OUT}${name}-${w}.webp`);
  await sharp(buf).resize({ width: Math.round(w / 2) }).webp({ quality: 78 }).toFile(`${OUT}${name}-${Math.round(w / 2)}.webp`);
}
fs.writeFileSync(`${OUT}sizes.json`, JSON.stringify(Object.fromEntries(Object.entries(scenes).map(([k, [w, h]]) => [k, { w, h }])), null, 1));
console.log('imagens:', Object.keys(scenes).length);
