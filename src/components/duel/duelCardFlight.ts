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
    const sourceRect = sourceEl.getBoundingClientRect();
    if (!sourceRect.width || !sourceRect.height) return;

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
    flyer.style.left = `${sourceRect.left}px`;
    flyer.style.top = `${sourceRect.top}px`;
    flyer.style.width = `${sourceRect.width}px`;
    flyer.style.height = `${sourceRect.height}px`;

    const flyerFace = document.createElement('div');
    flyerFace.setAttribute('aria-hidden', 'true');
    flyerFace.className = `dg-card dg-card${card.idImg} dg-cardHeaderFlyerFace`;
    flyer.appendChild(flyerFace);
    document.body.appendChild(flyer);

    const headerHeight = Math.max(sourceRect.height / 4.5, 16);
    const targetWidth = sourceRect.width;
    const targetHeight = headerHeight;
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
            { height: `${headerHeight}px`, opacity: 1 }
        ],
        {
            duration: 230,
            easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)',
            fill: 'forwards'
        }
    );

    const startFly = () => {
        const fly = flyer.animate(
            [
                {
                    left: `${sourceRect.left}px`,
                    top: `${sourceRect.top}px`,
                    width: `${sourceRect.width}px`,
                    height: `${headerHeight}px`,
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
                duration: 1300,
                easing: 'cubic-bezier(0.65, 0.18, 0.35, 0.82)',
                fill: 'forwards'
            }
        );

        fly.onfinish = () => {
            clearHiddenTargetCard();
            flyer.remove();
        };
        fly.oncancel = () => {
            clearHiddenTargetCard();
            flyer.remove();
        };
    };

    shrink.onfinish = startFly;
    shrink.oncancel = () => {
        clearHiddenTargetCard();
        flyer.remove();
    };
}
