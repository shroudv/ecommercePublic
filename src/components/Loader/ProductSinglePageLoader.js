import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function ProductSinglePageLoader() {
    return (
        <div className="row">
            <div className="col-5 row">
                <div className="col-3">
                    <Skeleton variant="rectangular rounded mt-3" height={98} />
                    <Skeleton variant="rectangular rounded mt-3" height={98} />
                    <Skeleton variant="rectangular rounded mt-3" height={98} />
                </div>
                <div className="col-9">
                    <Skeleton variant="rectangular rounded mt-3" height={'100%'} />

                </div>
            </div>
            <div className="col-7">
                <Stack spacing={1} className="mt-2">
                    <Skeleton animation="wave" height={40} style={{ marginBottom: 1 }} />
                    <Skeleton animation="wave" height={30} width="40%"  style={{ marginBottom: 15 }} />
                    <Skeleton variant="rectangular rounded mt-3" height={158} />
                    <Skeleton className='col-4' animation="wave" height={35} style={{ marginTop: 30 }} />
                    <div className="row mt-0">
                        <Skeleton className='col-2' animation="wave" height={80} />
                        <Skeleton className='col-2 mx-2' animation="wave" height={80} />
                        <Skeleton className='col-2 mx-2' animation="wave" height={80} />
                    </div>
                </Stack>
            </div>
        </div>
    )
}
