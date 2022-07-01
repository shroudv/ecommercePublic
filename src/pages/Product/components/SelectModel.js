import React from 'react'

export default function SelectModel(props) {
    return (
        <div className="d-flex gap-5 mb-3">
            <div className="technicalSide mb-4">
                <h5 className='mb-3'>Model Seçimi</h5>
                <div className="technicalOptions d-flex gap-2">
                    {
                        props.models ?
                            props.models.map((model, i) => {
                                return (
                                    <span
                                        key={i}
                                        className={`btn btn-model${props.state.selectedModel === model.id ? ' active' : ''}`}
                                        onClick={(e) => props.setModelHandler(model.id, e)}>{model.title}</span>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
