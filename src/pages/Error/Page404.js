import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="container">
      <div className="text-center col-12 py-5 pt-0 notFound">
        <img className='col-3' src="https://freefrontend.com/assets/img/html-css-404-page-templates/404-SVG-Animated-Page-Concept.png" alt="" />
        <h4 className='title mb-3 text'>Axtardığınız səhifə mövcud deyil</h4>
        <p className='col-8 mx-auto text-muted'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At officiis dolor pariatur magnam quaerat quae quia consequuntur nobis dolorem, excepturi vel illo consequatur corrupti voluptate rerum vitae dicta molestias. Natus.</p>
        <Link className='btn btn-outline-primary mt-4' to={'/'}>Ana Səhifə</Link>
      </div>
    </div>
  )
}
