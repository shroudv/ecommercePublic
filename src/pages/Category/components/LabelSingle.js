import React from 'react'
import { Link } from 'react-router-dom'

export default function LabelSingle(props) {
    return (
        <div className="col-xl-4">
            <Link to={props.link} onClick={() => props.categoryChangeHandler(props.params.child)}>
                <div className="categoryLabel">
                    {
                        !props.params.subcategory && !props.params.third ?
                            <div className="icon">
                                <i className={props.params.child.icon}></i>
                            </div>
                        : null
                    }
                    <div className="content">
                        <h5 className='bannerTitle'>{props.params.child.title}</h5>
                        <p>Lorem ipsum dolor</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}