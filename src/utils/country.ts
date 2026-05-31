/** ISO 3166-1 alpha-2 helpers and country list for selects (labels via Intl). */

const LANG_TO_DEFAULT_COUNTRY: Record<string, string> = {
    pl: 'PL',
    en: 'US',
    de: 'DE',
    fr: 'FR',
    es: 'ES',
    it: 'IT',
    pt: 'PT',
    nl: 'NL',
    ru: 'RU',
    uk: 'UA',
    cs: 'CZ',
    sk: 'SK',
    sv: 'SE',
    no: 'NO',
    da: 'DK',
    fi: 'FI',
    el: 'GR',
    ro: 'RO',
    hu: 'HU',
    bg: 'BG',
    hr: 'HR',
    sl: 'SI',
    et: 'EE',
    lv: 'LV',
    lt: 'LT',
    ja: 'JP',
    ko: 'KR',
    zh: 'CN',
    hi: 'IN'
};

/** Fallback when Intl.supportedValuesOf is unavailable (older runtimes). */
const FALLBACK_ISO_ALPHA2 = (
    'AC AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'
)
    .trim()
    .split(/\s+/);

let countryOptionsCache: { code: string; name: string }[] | null = null;

function listAlpha2Codes(): string[] {
    const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
    if (typeof intl.supportedValuesOf === 'function') {
        try {
            const raw = intl.supportedValuesOf('region');
            const two = raw.filter((c) => c.length === 2 && /^[A-Z]{2}$/.test(c));
            if (two.length > 50) return [...new Set(two)].sort();
        } catch {
            /* ignore */
        }
    }
    return [...FALLBACK_ISO_ALPHA2];
}

/** Sorted options for <select>: { code, name } with English region names. */
export function getCountrySelectOptions(): { code: string; name: string }[] {
    if (countryOptionsCache) return countryOptionsCache;
    const dn = new Intl.DisplayNames(['en'], { type: 'region' });
    const codes = listAlpha2Codes();
    countryOptionsCache = codes
        .map((code) => ({ code, name: dn.of(code) ?? code }))
        .sort((a, b) => a.name.localeCompare(b.name, 'en'));
    return countryOptionsCache;
}

/** Guess ISO alpha-2 from navigator locale (region subtag or language default). */
export function guessCountryFromLocale(): string {
    if (typeof navigator === 'undefined') return 'US';
    const langs = navigator.languages?.length ? [...navigator.languages] : [navigator.language];
    for (const tag of langs) {
        const segments = tag.split('-');
        for (let i = segments.length - 1; i >= 0; i -= 1) {
            const seg = segments[i].toUpperCase();
            if (seg.length === 2 && /^[A-Z]{2}$/.test(seg)) return seg;
        }
    }
    const primary = (langs[0] || 'en').split('-')[0].toLowerCase();
    return LANG_TO_DEFAULT_COUNTRY[primary] || 'US';
}

export function countryCodeToFlagEmoji(countryCode: string): string {
    const upper = countryCode.toUpperCase();
    if (upper.length !== 2 || !/^[A-Z]{2}$/.test(upper)) return '';
    return String.fromCodePoint(...[...upper].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
}

/** Raster flag (reliable on Windows; emoji flags often missing). flagcdn.com — ISO alpha-2. */
export function countryCodeToFlagUrl(countryCode: string, width: 20 | 28 = 20): string {
    const upper = countryCode.toUpperCase();
    if (upper.length !== 2 || !/^[A-Z]{2}$/.test(upper)) return '';
    return `https://flagcdn.com/w${width}/${upper.toLowerCase()}.png`;
}

export function getRegionDisplayName(countryCode: string): string {
    const upper = countryCode.toUpperCase();
    if (upper.length !== 2) return countryCode;
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(upper) ?? upper;
    } catch {
        return upper;
    }
}

export function normalizeCountryCode(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined;
    const t = value.trim().toUpperCase();
    if (t.length !== 2 || !/^[A-Z]{2}$/.test(t)) return undefined;
    return t;
}
