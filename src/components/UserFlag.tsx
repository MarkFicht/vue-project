import { useState } from 'react';
import {
    countryCodeToFlagEmoji,
    countryCodeToFlagUrl,
    getRegionDisplayName,
    normalizeCountryCode
} from '@/utils/country';

export function UserFlag({
    code,
    className = '',
    size = 20
}: {
    code?: string | null;
    className?: string;
    /** Pixel width for flag image (height keeps ~3:4 ratio). */
    size?: 20 | 28;
}) {
    const normalized = normalizeCountryCode(code ?? '');
    const [imgFailed, setImgFailed] = useState(false);
    if (!normalized) return null;
    const title = getRegionDisplayName(normalized);
    const w = size;
    const h = size === 28 ? 21 : 15;

    if (imgFailed) {
        const emoji = countryCodeToFlagEmoji(normalized);
        if (!emoji) return null;
        return (
            <span className={`select-none text-[1.1em] leading-none ${className}`} title={title} role="img" aria-label={title}>
                {emoji}
            </span>
        );
    }

    return (
        <span className={`inline-flex shrink-0 items-center ${className}`} title={title}>
            <img
                src={countryCodeToFlagUrl(normalized, size)}
                alt=""
                width={w}
                height={h}
                className="rounded-[3px] object-cover shadow-sm ring-1 ring-white/25"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
            />
        </span>
    );
}
