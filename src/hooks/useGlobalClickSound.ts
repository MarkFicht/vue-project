import { useEffect } from 'react';
import { ensureUiSoundReady, playUiSound } from '@/utils/sound';

const CLICKABLE_SELECTOR = 'button, a[href], [role="button"], input[type="button"], input[type="submit"], summary';

function isDisabledElement(element: Element): boolean {
    const htmlElement = element as HTMLElement;
    if (htmlElement.getAttribute('aria-disabled') === 'true') {
        return true;
    }
    if ('disabled' in htmlElement && (htmlElement as HTMLButtonElement | HTMLInputElement).disabled) {
        return true;
    }
    return false;
}

export function useGlobalClickSound() {
    useEffect(() => {
        ensureUiSoundReady();

        const onDocumentClick = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }
            const clickable = target.closest(CLICKABLE_SELECTOR);
            if (!clickable || isDisabledElement(clickable)) {
                return;
            }
            playUiSound('click');
        };

        document.addEventListener('click', onDocumentClick, true);
        return () => {
            document.removeEventListener('click', onDocumentClick, true);
        };
    }, []);
}
