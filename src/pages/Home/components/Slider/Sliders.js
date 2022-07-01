import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Slider from './Slider'
/*eslint-disable */
export default function Sliders() {
  const initalSliders = { sliders: [] }
  const initalState = { selectedSlide: 0 }
  const [getSliders, setSliders] = useState(initalSliders);
  const [getState, setState] = useState(initalState);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/sliders`).then((res) => {
      if (res.status == 200) {
        const { data } = res;
        setSliders({ ...getSliders, sliders: data })
      }
    }).catch((error) => {
      return enqueueSnackbar('Slider API Xətası: ' + error.code, { variant: 'error' })
    })
  }, [])


  const change = (num) => {
    setState({
      ...getState,
      selectedSlide: num
    })
  }
  return (
    <div className="slide_side container">
      <div className="slides">
        {
          getSliders.sliders.map((slider, i) => {
            return <Slider
              key={i}
              active={(getState.selectedSlide == i ? 1 : null)}
              title={slider.title}
              content={slider.content}
              src={slider.src}
            />
          })
        }
      </div>
      <div className="actions">
        {
          getSliders.sliders.map((slider, i) => {
            return <div key={i} onClick={() => change(i)} className={`dot ${getState.selectedSlide == i ? 'active' : ''} `}></div>
          })
        }
      </div>
    </div>
  )
}
