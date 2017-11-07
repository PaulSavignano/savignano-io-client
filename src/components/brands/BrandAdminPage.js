import React from 'react'
import PropTypes from 'prop-types'

import brandContainer from '../../containers/brands/brandContainer'
import BrandForm from './BrandForm'
import brandForms from './brandForms'

const BrandAdminPage = ({
  _id,
  canvasColor,
  fontFamily,
  matchedBrandItem,
  matchedBrandForm,
  dispatch
}) => {
  const {
    backgroundImage,
    image,
    values,
  } = matchedBrandItem
  const {
    name,
    fields
  } = matchedBrandForm
  return (
    <div className="page">
      <section className="section-margin">
        <BrandForm
          _id={_id}
          backgroundColor={canvasColor}
          backgroundImage={backgroundImage}
          dispatch={dispatch}
          image={image}
          fields={fields}
          fontFamily={fontFamily}
          form={name}
          initialValues={values}
        />
      </section>
    </div>
  )
}

BrandAdminPage.propTypes = {
  _id: PropTypes.string.isRequired,
  canvasColor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  matchedBrandForm: PropTypes.object.isRequired,
  matchedBrandItem: PropTypes.object.isRequired,
}

export default brandContainer(BrandAdminPage)
