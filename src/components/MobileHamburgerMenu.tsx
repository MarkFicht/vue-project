import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

type MobileHamburgerMenuProps = {
    open: boolean;
    onToggle: () => void;
    toggleClassName: string;
    panelClassName: string;
    listClassName: string;
    openLabel: string;
    closeLabel: string;
    children: ReactNode;
};

export function MobileHamburgerMenu({
    open,
    onToggle,
    toggleClassName,
    panelClassName,
    listClassName,
    openLabel,
    closeLabel,
    children
}: MobileHamburgerMenuProps) {
    return (
        <>
            <button
                type="button"
                className={toggleClassName}
                onClick={onToggle}
                aria-expanded={open}
                aria-label={open ? closeLabel : openLabel}
                title={open ? closeLabel : openLabel}
            >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            {open && (
                <div className={panelClassName}>
                    <div className={listClassName}>{children}</div>
                </div>
            )}
        </>
    );
}
