type SkeletonProps = {
    className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
    return <span className={`appSkeleton ${className}`.trim()} aria-hidden />;
}

type SkeletonVariantProps = {
    className?: string;
};

export function SkeletonDot({ className = '' }: SkeletonVariantProps) {
    return <Skeleton className={`dashSkeletonDot ${className}`.trim()} />;
}

export function SkeletonText({ className = '' }: SkeletonVariantProps) {
    return <Skeleton className={`dashSkeletonText ${className}`.trim()} />;
}

export function SkeletonTag({ className = '' }: SkeletonVariantProps) {
    return <Skeleton className={`dashSkeletonTag ${className}`.trim()} />;
}

export function SkeletonInput({ className = '' }: SkeletonVariantProps) {
    return <Skeleton className={`dashSkeletonInput ${className}`.trim()} />;
}
