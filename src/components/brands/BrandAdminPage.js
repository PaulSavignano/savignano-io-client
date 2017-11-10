import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import './brand.css'
import { fetchUpdate } from '../../actions/brand'
import brandContainer from '../../containers/brands/brandContainer'
import BrandFormField from './BrandFormField'
import ImageForm from '../images/ImageForm'
import SuccessableButton from '../../components/buttons/SuccessableButton'



class BrandAdminPage extends Component {
  state = {
    backgroundImageEdit: false,
    backgroundImageTimeoutId: null,
    deleteBackgroundImage: false,
    deleteImage: false,
    disabled: true,
    imageEdit: false,
    imageTimeoutId: null,
    name: null
  }
  handleImageEdit = (bool) => {
    const imageTimeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(this.state.imageTimeoutId)
    }, 9)
    this.setState({
      ...this.state,
      disabled: false,
      imageEdit: bool,
      imageTimeoutId
    })
  }
  handleBackgroundImageEdit = (bool) => {
    const backgroundImageTimeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(this.state.backgroundTimeoutId)
    }, 9)
    this.setState({
      ...this.state,
      backgroundImageEdit: bool,
      backgroundImageTimeoutId,
      disabled: false
    })
  }
  handleImageRemove = () => {
    const { image } = this.props
    const deleteImage = image.src ? true : false
    this.setState({
      ...this.state,
      imageEdit: false,
      deleteImage,
      disabled: false
    })
  }
  handleBackgroundImageRemove = () => {
    const { backgroundImage } = this.props
    const deleteBackgroundImage = backgroundImage.src ? true : false
    this.setState({
      ...this.state,
      imageEdit: false,
      deleteBackgroundImage,
      disabled: false
    })
  }
  handleFormSubmit = (values) => {
    const {
      backgroundImageEdit,
      deleteBackgroundImage,
      deleteImage,
      imageEdit,
    } = this.state
    const {
      _id,
      backgroundImage,
      dispatch,
      form,
      image,
    } = this.props
    const newBackgroundImage = backgroundImageEdit ? this.backgroundImageEditor.handleSave() : null
    const newImage = imageEdit ? this.imageEditor.handleSave() : null
    const oldBackgroundImageSrc = backgroundImage && backgroundImage.src ? backgroundImage.src : null
    const oldImageSrc = image && image.src ? image.src : null
    switch(true) {
      case (imageEdit && backgroundImageEdit):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image-and-background-image`,
          update: {
            newImage,
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (imageEdit && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image-and-delete-background-image`,
          update: {
            newImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values,
          }
        }))
      case (backgroundImageEdit && deleteImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-background-image-and-delete-image`,
          update: {
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (deleteImage && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-image-and-delete-background-image`,
          update: {
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (imageEdit):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image`,
          update: {
            newImage,
            oldImageSrc,
            values
          }
        }))
      case (backgroundImageEdit):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-background-image`,
          update: {
            newBackgroundImage,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (deleteImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-image`,
          update: {
            oldImageSrc,
            values
          }
        }))
      case (deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-background-image`,
          update: {
            oldBackgroundImageSrc,
            values
          }
        }))
      default:
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-values`,
          update: {
            values
          }
        }))
    }
  }
  componentDidMount() {
    console.log('BrandAdminPage Mounted')
  }
  componentWillUnmount() {
    console.log('BrandAdminPage Unmounted')
  }
  componentWillReceiveProps({ pristine, matchedBrandForm: { name }}) {
    if (name !== this.props.matchedBrandForm.name || pristine !== this.props.pristine) this.setState({ ...this.state, disabled: pristine, name })
  }
  setImageFormRef = (imageEditor) => this.imageEditor = imageEditor
  setBackgroundImageFormRef = (backgroundImageEditor) => this.backgroundImageEditor = backgroundImageEditor
  render() {
    const {
      canvasColor,
      fontFamily,
      matchedBrandItem: {
        backgroundImage,
        image,
      },
      matchedBrandForm: {
        name,
        fields
      },
      error,
      handleSubmit,
      reset,
      submitSucceeded,
      submitting,
    } = this.props
          console.log('brandPage render')
    return (
      <div className="page">
        <section className="section-margin">
          <Card
            className="brand-form"
            style={{ backgroundColor: canvasColor, fontFamily }}
          >

            <CardTitle title={`${name}`} />
            {image &&
              <ImageForm
                key={1}
                image={image}
                label="image"
                type="image/jpg"
                onImageEdit={this.handleImageEdit}
                onImageRemove={this.handleImageRemove}
                ref={this.setImageFormRef}
              />
            }
            {backgroundImage &&
              <ImageForm
                key={2}
                image={backgroundImage}
                label="backgroundImage"
                type="image/jpg"
                onImageEdit={this.handleBackgroundImageEdit}
                onImageRemove={this.handleBackgroundImageRemove}
                ref={this.setBackgroundImageFormRef}
              />
            }
            <form
              onSubmit={handleSubmit(this.handleFormSubmit)}
            >
              <div className="field-container">
                {fields.map(({ max, min, name, options, type }) => (
                  <BrandFormField
                    fontFamily={fontFamily}
                    key={name}
                    max={max}
                    min={min}
                    name={name}
                    options={options}
                    type={type}
                  />
                ))}
              </div>
              {error && <div className="error">{error}</div>}
              <div className="button-container">
                <SuccessableButton
                  disabled={this.state.disabled}
                  error={error}
                  imageEdit={this.state.imageEdit}
                  label={`update ${name}`}
                  reset={reset}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel={`${name} updated!`}
                />
              </div>
            </form>
          </Card>
        </section>
      </div>
    )
  }
}

BrandAdminPage.propTypes = {
  _id: PropTypes.string.isRequired,
  canvasColor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  fontFamily: PropTypes.string.isRequired,
  matchedBrandForm: PropTypes.object.isRequired,
  matchedBrandItem: PropTypes.object.isRequired,
}

export default brandContainer(reduxForm({
  enableReinitialize: true
})(BrandAdminPage))
