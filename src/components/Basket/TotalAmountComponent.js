import React from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../Helpers/GeneralHelper'

export default function TotalAmountComponent(props) {
    return (
        <div className="totalAmounts">
            <h4>Ümumi</h4>
            <div className="group">
                <span>Ümumi Məbləğ</span>
                <span className='font-bold price'>{formatMoney(props.amount)}</span>
            </div>
            <div className="group">
                <span>ƏDV (18%)</span>
                <span className='font-bold price'>{formatMoney(props.taxPrice)}</span>
            </div>
            <div className="group">
                <span>Yekun Məbləğ</span>
                <span className='font-bold price'>{formatMoney(props.totalAmount)}</span>
            </div>
            <div className="actions">
                <Link to="#" className='btn submit btn-primary'>Sifarişi Tamamla</Link>
                <Link to="#" onClick={(e) => props.clearBasket(e)} className='btn clear btn-outline-secondary'>Səbəti Təmizlə</Link>
            </div>
        </div>
    )
}
