import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

import './section.css'

const CrossFade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={2000}
    classNames="cross-fade"
  >
    {children}
  </CSSTransition>
)

export default CrossFade
