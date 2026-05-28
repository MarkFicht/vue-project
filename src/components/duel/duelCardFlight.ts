import type { IGameDuelCard } from '@/interfaces/GameDuel';

export type FlightFallbackPlacement = 'same-spot' | 'below-last';
export type FlightTargetSelection = 'match-card' | 'last-slot' | 'none';
export type FlightVisualMode = 'header-shrink' | 'flip-to-back';

type PlayCardFlightAnimationArgs = {
    sourceEl: HTMLElement;
    targetEl: HTMLElement;
    card: IGameDuelCard;
    fallbackPlacement?: FlightFallbackPlacement;
    targetSelection?: FlightTargetSelection;
    visualMode?: FlightVisualMode;
};

export function playCardFlightAnimation({
    sourceEl,
    targetEl,
    card,
    fallbackPlacement = 'below-last',
    targetSelection = 'match-card',
    visualMode = 'header-shrink'
}: PlayCardFlightAnimationArgs) {
    const SOURCE_VISUAL_TOP_OFFSET_PX = 2;
    const SHRINK_DURATION_MS = 230;
    const SHRINK_EASING = 'cubic-bezier(0.2, 0.75, 0.2, 1)';
    const FLY_DURATION_MS = 1300;
    const FLY_EASING = 'cubic-bezier(0.65, 0.18, 0.35, 0.82)';
    const sourceRect = sourceEl.getBoundingClientRect();
    const reverseBg =
        card.tier === 'I'
            ? 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)'
            : card.tier === 'II'
              ? 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)'
              : card.tier === 'III'
                ? '0 calc(var(--height-tier) * -7)'
                : 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';

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
    const wonderWrapperRect =
        visualMode === 'flip-to-back'
            ? targetEl.closest('.dg-wonderWrapper')?.getBoundingClientRect() ?? null
            : null;

    const flyer = document.createElement('div');
    flyer.className = 'dg-cardHeaderFlyer';
    if (visualMode === 'flip-to-back') {
        flyer.classList.add('dg-cardHeaderFlyer--wonder');
        flyer.style.transformOrigin = 'top left';
    }
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
    flyerFace.style.setProperty('--reversBg', reverseBg);
    flyerFace.style.transformOrigin = visualMode === 'flip-to-back' ? 'center center' : 'top left';
    flyer.appendChild(flyerFace);
    document.body.appendChild(flyer);

    const headerMode = visualMode === 'header-shrink';
    const sourceHeaderHeight = Math.max(sourceVisualRect.height / 4.5, 16);
    const targetHeight = headerMode
        ? Math.max(targetCardLike?.getBoundingClientRect().height ?? sourceHeaderHeight, 16)
        : sourceVisualRect.height;
    const mobileStartHeightOffset = window.matchMedia('(max-width: 768px)').matches ? 1 : 0;
    const flightStartHeight = headerMode
        ? Math.max(16, Math.min(sourceHeaderHeight, targetHeight) - mobileStartHeightOffset)
        : sourceVisualRect.height;
    const targetWidth = headerMode ? (targetCardLike ? targetRect.width : sourceRect.width) : sourceVisualRect.width;
    const targetLeft = targetCardLike
        ? targetRect.left
        : targetRect.left + Math.max(0, targetRect.width / 2 - targetWidth / 2);
    const targetTop =
        targetSelection === 'none'
            ? targetRect.top
            : pendingTargetCard
              ? targetRect.top
              : targetCardLike
                ? fallbackPlacement === 'below-last'
                    ? targetRect.top + targetRect.height + 2
                    : targetRect.top
                : targetRect.top + 1;
    const flyTargetLeft =
        visualMode === 'flip-to-back' && wonderWrapperRect
            ? wonderWrapperRect.left + wonderWrapperRect.width / 2 - targetWidth / 2
            : targetLeft;
    const flyTargetTop =
        visualMode === 'flip-to-back' && wonderWrapperRect
            ? wonderWrapperRect.top + wonderWrapperRect.height / 2 - targetHeight / 2
            : targetTop;

    let hiddenTargetCards: HTMLElement[] = [];
    let hideRafId = 0;
    const syncHiddenTargetCard = () => {
        const nextHiddenCards =
            targetSelection === 'none'
                ? []
                : targetSelection === 'last-slot'
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
    if (visualMode === 'flip-to-back') {
        targetEl.classList.add('dg-arrivalPending');
    }

    const startFly = () => {
        const flyRotateStart = visualMode === 'flip-to-back' ? 'rotate(-0deg)' : 'none';
        const flyRotateEnd = visualMode === 'flip-to-back' ? 'rotate(-90deg)' : 'none';
        const faceScaleX = visualMode === 'flip-to-back' ? 1 : targetWidth > 0 ? targetWidth / sourceVisualRect.width : 1;
        const faceScaleY = visualMode === 'flip-to-back' ? 1 : targetHeight > 0 ? targetHeight / flightStartHeight : 1;
        const faceScale =
            visualMode === 'flip-to-back'
                ? null
                : flyerFace.animate(
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
                    opacity: 1,
                    transform: flyRotateStart
                },
                {
                    left: `${flyTargetLeft}px`,
                    top: `${flyTargetTop}px`,
                    width: `${targetWidth}px`,
                    height: `${targetHeight}px`,
                    opacity: visualMode === 'flip-to-back' ? 0 : 0.94,
                    transform: flyRotateEnd
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
            flyer.remove();
            if (visualMode === 'flip-to-back') {
                window.requestAnimationFrame(() => {
                    targetEl.classList.remove('dg-arrivalPending');
                    targetEl.classList.add('dg-tierCardForWonder--arrive');
                    window.setTimeout(() => targetEl.classList.remove('dg-tierCardForWonder--arrive'), 280);
                });
            }
        };
        fly.oncancel = () => {
            clearHiddenTargetCard();
            if (visualMode === 'flip-to-back') targetEl.classList.remove('dg-arrivalPending');
            if (faceScale) faceScale.cancel();
            flyer.remove();
        };
    };

    if (visualMode === 'flip-to-back') {
        const flipFirstHalf = flyerFace.animate(
            [
                { transform: 'rotateY(0deg)' },
                { transform: 'rotateY(90deg)' }
            ],
            {
                duration: 130,
                easing: 'ease-in',
                fill: 'forwards'
            }
        );

        flipFirstHalf.onfinish = () => {
            flyerFace.classList.add('dg-hideCard');
            const flipSecondHalf = flyerFace.animate(
                [
                    { transform: 'rotateY(90deg)' },
                    { transform: 'rotateY(0deg)' }
                ],
                {
                    duration: 130,
                    easing: 'ease-out',
                    fill: 'forwards'
                }
            );
            flipSecondHalf.onfinish = startFly;
            flipSecondHalf.oncancel = () => {
                clearHiddenTargetCard();
                targetEl.classList.remove('dg-arrivalPending');
                flyer.remove();
            };
        };

        flipFirstHalf.oncancel = () => {
            clearHiddenTargetCard();
            targetEl.classList.remove('dg-arrivalPending');
            flyer.remove();
        };
        return;
    }

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

    shrink.onfinish = startFly;
    shrink.oncancel = () => {
        clearHiddenTargetCard();
        targetEl.classList.remove('dg-arrivalPending');
        flyer.remove();
    };
}
