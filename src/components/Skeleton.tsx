import React from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

interface CustomSkeletonProps extends SkeletonProps {
    circle?: boolean;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
    width,
    height,
    circle,
    ...props
}) => {
  return <Skeleton width={width} height={height} circle={circle} {...props} />
};

export default CustomSkeleton
