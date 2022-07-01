import React from 'react'

export default function Galleries(props) {
    return (
        <div className="galleries">
            <div className="main">
                {
                    props.galleries ? <img src={props.galleries[props.selectedGallery].src} alt="" /> : null
                }
            </div>
            <div className="thumbs">
                {
                    props.galleries ?
                        props.galleries.map((gallery, i) => {
                            return (
                                <img key={i} className={`${i === Number(props.selectedGallery) ? 'active' : ''}`}
                                    onClick={() => props.showGallery(i)} src={gallery.src} alt="" />
                            )
                        })
                        : null
                }
            </div>
        </div>
    )
}
