import { ChevronDown, Globe, Search } from 'lucide-react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { UserFlag } from '@/components/UserFlag';
import { getRegionDisplayName, normalizeCountryCode } from '@/utils/country';

export type CountryOption = { code: string; name: string };

export function CountrySelect({
    value,
    onChange,
    options,
    disabled,
    id,
    placeholder = 'Search country or code…'
}: {
    value: string;
    onChange: (code: string) => void;
    options: CountryOption[];
    disabled?: boolean;
    id?: string;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter(
            (o) => o.name.toLowerCase().includes(q) || o.code.toLowerCase().includes(q)
        );
    }, [options, query]);

    useLayoutEffect(() => {
        if (!open) return;

        const update = () => {
            const btn = triggerRef.current;
            if (!btn) return;
            const r = btn.getBoundingClientRect();
            const margin = 10;
            const preferredMax = 320;
            let top = r.bottom + 6;
            let maxHeight = Math.min(preferredMax, window.innerHeight - top - margin);

            if (maxHeight < 140 && r.top > 180) {
                const spaceAbove = r.top - margin - 6;
                const upHeight = Math.min(preferredMax, spaceAbove);
                if (upHeight > maxHeight) {
                    top = r.top - 6 - upHeight;
                    maxHeight = upHeight;
                }
            }

            setPanelStyle({
                position: 'fixed',
                left: r.left,
                width: r.width,
                top,
                maxHeight,
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            });
        };

        update();
        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update, true);
            window.removeEventListener('resize', update);
        };
    }, [open, filtered.length]);

    useEffect(() => {
        if (!open) return;
        const onDoc = (e: MouseEvent) => {
            const t = e.target as Node;
            if (rootRef.current?.contains(t) || panelRef.current?.contains(t)) return;
            setOpen(false);
            setQuery('');
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    const selected = options.find((o) => o.code === value);
    const label = selected ? selected.name : getRegionDisplayName(value);
    const hasValidCode = !!normalizeCountryCode(value);

    const panel = open ? (
        <div
            ref={panelRef}
            style={panelStyle}
            className="flex flex-col overflow-hidden rounded-xl border border-cyan-500/25 bg-slate-950 shadow-2xl shadow-black/60 ring-1 ring-white/10 backdrop-blur-md"
            role="listbox"
        >
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2.5 py-2">
                <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                <input
                    ref={searchInputRef}
                    type="search"
                    autoComplete="off"
                    className="w-full border-0 bg-transparent py-1 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <ul className="modalLikeScrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
                {filtered.length === 0 ? (
                    <li className="px-3 py-4 text-center text-sm text-slate-500">No matches</li>
                ) : (
                    filtered.map((opt) => {
                        const active = opt.code === value;
                        return (
                            <li key={opt.code} role="presentation">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition ${
                                        active
                                            ? 'bg-cyan-500/20 text-cyan-100'
                                            : 'text-slate-200 hover:bg-white/10'
                                    }`}
                                    onClick={() => {
                                        onChange(opt.code);
                                        setOpen(false);
                                        setQuery('');
                                    }}
                                >
                                    <UserFlag code={opt.code} size={20} className="shrink-0" />
                                    <span className="min-w-0 flex-1 truncate font-medium">{opt.name}</span>
                                    <span className="shrink-0 font-mono text-xs text-slate-500">{opt.code}</span>
                                </button>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    ) : null;

    return (
        <div ref={rootRef} className="relative w-full">
            <button
                ref={triggerRef}
                type="button"
                id={id}
                disabled={disabled}
                onClick={() => !disabled && setOpen((o) => !o)}
                className="input flex w-full items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-60"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span className="flex min-w-0 flex-1 items-center gap-2.5">
                    {hasValidCode ? (
                        <UserFlag code={value} size={20} className="shrink-0" />
                    ) : (
                        <Globe className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                    )}
                    <span className="truncate font-medium">{label}</span>
                </span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
                    aria-hidden
                />
            </button>
            {typeof document !== 'undefined' && panel ? createPortal(panel, document.body) : null}
        </div>
    );
}
