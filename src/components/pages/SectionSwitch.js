import React from 'react'

import Section from '../sections/Section'
import SectionSlideShow from '../sections/SectionSlideShow'
import SectionSwipeable from '../sections/SectionSwipeable'

const SectionSwitch = ({
  dispatch,
  hash,
  pageId,
  pageSlug,
  section,
}) => {
  switch(section.values.kind) {
    case 'Flex':
      return <Section
        dispatch={dispatch}
        key={section._id}
        hash={hash}
        item={section}
        pageId={pageId}
        pageSlug={pageSlug}
             />
   case 'SlideShow':
     return <SectionSlideShow
       dispatch={dispatch}
       key={section._id}
       hash={hash}
       item={section}
       pageId={pageId}
       pageSlug={pageSlug}
            />
    case 'Swipeable':
      return <SectionSwipeable
        dispatch={dispatch}
        key={section._id}
        hash={hash}
        item={section}
        pageId={pageId}
        pageSlug={pageSlug}
             />
    default:
      return <Section
        dispatch={dispatch}
        key={section._id}
        hash={hash}
        item={section}
        pageId={pageId}
        pageSlug={pageSlug}
             />
  }
}


export default SectionSwitch
