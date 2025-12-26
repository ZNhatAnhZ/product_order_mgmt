import {Skeleton} from "@mui/material";

export const SkeletonWrapper = ({ children, isLoading}) => {
    if (!isLoading) return children;
    return (
        <Skeleton>
            {children}
        </Skeleton>
    );
}