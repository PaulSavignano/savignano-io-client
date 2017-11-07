import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import brandForms from '../brands/brandForms'

const DrawerBrandLinks = ({ handleDrawerClose }) => (
  brandForms.map(({ name }, i) => {
    return (
      <ListItem
        key={i}
        primaryText={name}
        onTouchTap={handleDrawerClose}
        containerElement={<Link to={`/admin/brand/${name}`}/>}
        innerDivStyle={{ marginLeft: 36 }}
      />
    )
  })
)

export default DrawerBrandLinks
