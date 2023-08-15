import { Skeleton } from "@mui/material";

function CustomSkeleton() {
    return (
        <div className="flex items-center justify-center mb-4">
            <div className="w-fit h-20">
                <div className="m-1"><Skeleton variant="rounded" width={40} height={40} animation="wave"></Skeleton></div>
                <div className="m-1"><Skeleton variant="rounded" width={40} height={24}></Skeleton></div>
            </div>

            <div className="w=fit h-20 flex flex-col items-start justify-start">
                <div className="flex items-center justify-center">
                    <div className="m-1"><Skeleton variant="rounded" width={100} height={20}></Skeleton></div>
                    <div className="m-1"><Skeleton variant="rounded" width={60} height={20}></Skeleton></div>
                    <div className="m-1"><Skeleton variant="rounded" width={60} height={20}></Skeleton></div>
                    <div className="m-1"><Skeleton variant="rounded" width={60} height={20}></Skeleton></div>
                </div>


                <div className="flex">
                    <div className="m-1"><Skeleton variant="rounded" width={325} height={40} animation="wave"></Skeleton></div>
                </div>
            </div>
        </div>
    )
}

export default function LoadingPanel() {
    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-full pt-6">
                {Array(10).fill(null).map((_, i) => <CustomSkeleton key={i}></CustomSkeleton>)}
            </div>
        </>
    )
}