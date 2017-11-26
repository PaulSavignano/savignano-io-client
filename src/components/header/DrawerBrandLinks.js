import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import adminBrandForms from '../../utils/adminBrandForms'

const DrawerBrandLinks = ({ handleDrawerClose }) => (
  adminBrandForms.map(({ name }, i) => {
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
