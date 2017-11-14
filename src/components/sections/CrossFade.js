import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
