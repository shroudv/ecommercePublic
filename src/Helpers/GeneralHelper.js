import React from 'react'

import { useSnackbar } from "notistack";


export const formatMoney = (money) => {
    const num=Number(money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

   return num.split('.00') ? num.split('.00')[0] + ' ₼' : num + ' ₼';
}

export const loaderAnimation = () => {
    return <div className="lds-ripple"><div></div><div></div></div>
}

export const ShowMessage = (message, type) => {
    const { enqueueSnackbar } = useSnackbar();

    return enqueueSnackbar(message, {
        variant: type,
    });
}