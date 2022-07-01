import React from 'react'

import { useSnackbar } from "notistack";


export const formatMoney = (money) => {
    return Number(money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ₼';
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