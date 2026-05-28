import type { IGameDuelCard } from '@/interfaces/GameDuel';

export type FlightFallbackPlacement = 'same-spot' | 'below-last';
export type FlightTargetSelection = 'match-card' | 'last-slot';

type PlayCardFlightAnimationArgs = {
    sourceEl: HTMLElement;
    targetEl: HTMLElement;
    card: IGameDuelCard;
    fallbackPlacement?: FlightFallbackPlacement;
    targetSelection?: FlightTargetSelection;
};

export function playCardFlightAnimation({
    sourceEl,
    targetEl,
    card,
    fallbackPlacement = 'below-last',
    targetSelection = 'match-card'
}: PlayCardFlightAnimationArgs) {
    const SOURCE_VISUAL_TOP_OFFSET_PX = 2;
    const SHRINK_DURATION_MS = 230;
    const SHRINK_EASING = 'cubic-bezier(0.2, 0.75, 0.2, 1)';
    const FLY_DURATION_MS = 1300;
    const FLY_EASING = 'cubic-bezier(0.65, 0.18, 0.35, 0.82)';
    const sourceRect = sourceEl.getBoundingClientRect();
    const sourceCardFace = sourceEl.querySelector<HTMLElement>('.dg-card');
    const sourceVisualRect = sourceCardFace?.getBoundingClientRect() ?? sourceRect;
    if (!sourceVisualRect.width || !sourceVisualRect.height) return;
    const startLeft = sourceVisualRect.left;
    const startTop = sourceVisualRect.top + SOURCE_VISUAL_TOP_OFFSET_PX;

    const getTargetCards = () =>
        targetEl.classList.contains('dg-cardWrapperCompact')
            ? [targetEl]
            : Array.from(targetEl.querySelectorAll<HTMLElement>('.dg-cardWrapperCompact'));

    const getPendingTargetCard = () => {
        const targetCards = getTargetCards();
        if (targetSelection === 'last-slot') return targetCards.length ? targetCards[targetCards.length - 1] : undefined;
        return [...targetCards]
            .reverse()
            .find((candidate) => !!candidate.querySelector(`.dg-card${card.idImg}`));
    };

    const targetCards = getTargetCards();
    const pendingTargetCard = getPendingTargetCard();
    const targetCardLike = pendingTargetCard ?? (targetCards.length ? targetCards[targetCards.length - 1] : null);
    const targetRect = targetCardLike?.getBoundingClientRect() ?? targetEl.getBoundingClientRect();
    if (!targetRect.width || !targetRect.height) return;

    const flyer = document.createElement('div');
    flyer.className = 'dg-cardHeaderFlyer';
    flyer.style.left = `${startLeft}px`;
    flyer.style.top = `${startTop}px`;
    flyer.style.width = `${sourceVisualRect.width}px`;
    flyer.style.height = `${sourceVisualRect.height}px`;

    const flyerFace = document.createElement('div');
    flyerFace.setAttribute('aria-hidden', 'true');
    flyerFace.className = `dg-card dg-card${card.idImg} dg-cardHeaderFlyerFace`;
    flyerFace.style.position = 'absolute';
    flyerFace.style.top = '0';
    flyerFace.style.left = '0';
    flyerFace.style.setProperty('--width-tier', `${sourceVisualRect.width}px`);
    flyerFace.style.setProperty('--height-tier', `${sourceVisualRect.height}px`);
    flyerFace.style.transformOrigin = 'top left';
    flyer.appendChild(flyerFace);
    document.body.appendChild(flyer);

    const sourceHeaderHeight = Math.max(sourceVisualRect.height / 4.5, 16);
    const targetHeight = Math.max(targetCardLike?.getBoundingClientRect().height ?? sourceHeaderHeight, 16);
    const flightStartHeight = Math.min(sourceHeaderHeight, targetHeight);
    const targetWidth = targetCardLike ? targetRect.width : sourceRect.width;
    const targetLeft = targetCardLike
        ? targetRect.left
        : targetRect.left + Math.max(0, targetRect.width / 2 - targetWidth / 2);
    const targetTop = pendingTargetCard
        ? targetRect.top
        : targetCardLike
          ? fallbackPlacement === 'below-last'
              ? targetRect.top + targetRect.height + 2
              : targetRect.top
          : targetRect.top + 1;

    let hiddenTargetCards: HTMLElement[] = [];
    let hideRafId = 0;
    const syncHiddenTargetCard = () => {
        const nextHiddenCards =
            targetSelection === 'last-slot'
                ? (() => {
                      const wrappers = getTargetCards();
                      return wrappers.length ? [wrappers[wrappers.length - 1]] : [];
                  })()
                : Array.from(targetEl.querySelectorAll<HTMLElement>(`.dg-card${card.idImg}`))
                      .map((face) => face.closest('.dg-cardWrapperCompact'))
                      .filter((wrapper): wrapper is HTMLElement => !!wrapper);

        hiddenTargetCards.forEach((wrapper) => {
            if (!nextHiddenCards.includes(wrapper)) wrapper.classList.remove('dg-arrivalPending');
        });
        nextHiddenCards.forEach((wrapper) => wrapper.classList.add('dg-arrivalPending'));
        hiddenTargetCards = nextHiddenCards;
        hideRafId = window.requestAnimationFrame(syncHiddenTargetCard);
    };

    const clearHiddenTargetCard = () => {
        if (hideRafId) {
            window.cancelAnimationFrame(hideRafId);
            hideRafId = 0;
        }
        hiddenTargetCards.forEach((wrapper) => wrapper.classList.remove('dg-arrivalPending'));
        hiddenTargetCards = [];
    };
    syncHiddenTargetCard();

    const shrink = flyer.animate(
        [
            { height: `${sourceRect.height}px`, opacity: 1 },
            { height: `${flightStartHeight}px`, opacity: 1 }
        ],
        {
            duration: SHRINK_DURATION_MS,
            easing: SHRINK_EASING,
            fill: 'forwards'
        }
    );

    const startFly = () => {
        const faceScaleX = targetWidth > 0 ? targetWidth / sourceVisualRect.width : 1;
        const faceScaleY = targetHeight > 0 ? targetHeight / flightStartHeight : 1;
        const faceScale = flyerFace.animate(
            [
                { transform: 'scale(1, 1)' },
                { transform: `scale(${faceScaleX}, ${faceScaleY})` }
            ],
            {
                duration: FLY_DURATION_MS,
                easing: FLY_EASING,
                fill: 'forwards'
            }
        );
        const fly = flyer.animate(
            [
                {
                    left: `${startLeft}px`,
                    top: `${startTop}px`,
                    width: `${sourceVisualRect.width}px`,
                    height: `${flightStartHeight}px`,
                    opacity: 1
                },
                {
                    left: `${targetLeft}px`,
                    top: `${targetTop}px`,
                    width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    opacity: 0.94
                }
            ],
            {
                duration: FLY_DURATION_MS,
                easing: FLY_EASING,
                fill: 'forwards'
            }
        );

        fly.onfinish = () => {
            clearHiddenTargetCard();
            faceScale.cancel();
            flyer.remove();
        };
        fly.oncancel = () => {
            clearHiddenTargetCard();
            faceScale.cancel();
            flyer.remove();
        };
    };

    shrink.onfinish = startFly;
    shrink.oncancel = () => {
        clearHiddenTargetCard();
        flyer.remove();
    };
}
