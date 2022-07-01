import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ProductGenLoader(props) {
  const arr = []
  for (var i = 0; i <= props.count; i++) {
    arr.push(i)
  }
  return (
    <div className='row'>
      {
        arr.map((e, i) => {
          return (
            <Stack key={i} spacing={1} className="col-4 my-3">
              <Skeleton animation="wave" height={20} style={{ marginBottom: 2 }} />
              <Skeleton animation="wave" height={20} width="40%" />
              <Skeleton variant="rectangular rounded mt-3" height={258} />
              <div className='d-flex justify-content-space-between'>
                <Skeleton className='col-7' animation="wave" height={20} style={{ marginBottom: 2 }} />
                <Skeleton className='col-4' animation="wave" height={20} />
              </div>
            </Stack>
          )
        })
      }
    </div>
  );
}
