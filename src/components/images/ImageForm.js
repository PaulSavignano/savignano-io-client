import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import CircularProgress from 'material-ui/CircularProgress'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

import './images.css'
import ImageEditor from './ImageEditor'

const formStyles = {
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto',
    margin: 4
  },
  button: {
    margin: '0 0 0 8px',
    flex: '1 1 auto',
    height: 24
  }
}

class ImageForm extends Component {
  state = {
    editing: false,
    ext: null,
    gradientY0: 0,
    gradientY1: 0,
    height: null,
    loading: false,
    maxHeight: null,
    maxWidth: null,
    opacity: 1,
    position: { x: 0.5, y: 0.5 },
    resizeProportionally: true,
    rotate: 0,
    scale: 1,
    src: null,
    width: null,
  }
  handleChangeType = (event, index, value) => {
    const ext = value
    this.setState({ ext })
  }
  handleGradientY0 = (e) => {
    const gradientY0 = parseFloat(e.target.value)
    this.setState({ gradientY0 })
  }
  handleGradientY1 = (e) => {
    const gradientY1 = parseFloat(e.target.value)
    this.setState({ gradientY1 })
  }
  handleHeight = (e) => {
    const { height, width, resizeProportionally } = this.state
    const inputHeight = parseInt(e.target.value, 10)
    const newHeight = inputHeight || 1
    if (resizeProportionally) {
      const ratio = newHeight / height
      const newWidth = width * ratio
      this.setState({
        width: newWidth,
        height: newHeight
      })
    }
    this.setState({
      height: newHeight
    })
  }
  handleImage = (image) => {
    if (image && image.src) {
      const extension = image.src.split('.')[1]
      console.log('extension', extension)
      const ext = extension === 'png' ? 'png' : 'jpeg'
      this.setState({
        height: image.height,
        maxHeight: image.height,
        maxWidth: image.width,
        src: `${process.env.REACT_APP_IMAGE_ENDPOINT}${image.src}`,
        ext,
        width: image.width,
      })
    }
  }
  handleImageRemove = () => {
    const { onImageRemove } = this.props
    if (window.confirm('Are you sure you want to delete this image?')) {
      this.setState({
        ...this.state,
        src: null,
        editing: false
      })
      return onImageRemove()
    }
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity })
  }
  handlePositionChange = position => {
    this.setState({ position })
  }
  handleRotateLeft = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate - 90 })
  }
  handleRotateRight = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate + 90 })
  }
  handleSave = () => {
    const { width, height, ext } = this.state
    const type = ext ? `image/${ext}` : 'image/jpeg'
    const image = {
      height,
      src: this.editor.getImageScaledToCanvas().toDataURL(type, .92),
      ext,
      width,
    }
    this.setState({ editing: false, ...image, submitted: false })
    return image
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  handleUpdateCheck = () => {
    this.setState((oldState) => {
      return {
        resizeProportionally: !oldState.resizeProportionally,
      }
    })
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    if (file) {
      this.setState({ loading: true })
      reader.onload = (e) => {
        const img = new Image()
        const src = e.target.result
        img.src = e.target.result
        img.onload = () => {
          const extension = file.type.split('/')[1]
          const ext = extension === 'png' ? 'png' : 'jpeg'
          this.setState({
            editing: true,
            ext,
            height: img.height,
            loading: false,
            maxHeight: img.height,
            maxWidth: img.width,
            src,
            width: img.width,
          })
        }
        img.src = src
        this.props.onImageEdit(true)
      }
      reader.readAsDataURL(file)
    }
  }
  handleWidth = (e) => {
    const { height, width, resizeProportionally } = this.state
    const inputWidth = parseInt(e.target.value, 10)
    const newWidth = inputWidth || 1
    if (resizeProportionally) {
      const ratio = newWidth / width
      const newHeight = height * ratio
      this.setState({
        width: newWidth,
        height: newHeight
      })
    }
    this.setState({
      width: newWidth
    })
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }
  componentWillMount() {
    const { image } = this.props
    this.handleImage(image)
  }
  componentWillReceiveProps({ image }) {
    if (image.src && image.src !== this.props.image.src) {
      this.handleImage(image)
    }
  }
  renderLabel = () => {
    const { ext, width, height } = this.state
    const { label } = this.props
    if (width && height) {
      return `Choose ${Math.round(width)} x ${Math.round(height)} ${ext} ${label}`
    }
    return `Choose ${label}`
  }
  setEditorRef = (editor) => this.editor = editor
  render () {
    const {
      editing,
      gradientY0,
      gradientY1,
      height,
      loading,
      maxHeight,
      maxWidth,
      opacity,
      position,
      rotate,
      scale,
      src,
      width,
    } = this.state
    const {
      fontFamily,
      label,
    } = this.props
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {this.state.editing &&
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', margin: 4 }}>
            <div style={{ margin: 4 }}>
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(scale)}
                opacity={parseFloat(opacity)}
                width={width}
                height={height}
                position={position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(rotate)}
                onSave={this.handleSave}
                image={src}
                gradientY0={gradientY0}
                gradientY1={gradientY1}
                crossOrigin="anonymous"
              />
            </div>

            <div style={{ flex: '1 1 auto' }}>
              <div style={formStyles.controlContainer}>
                <label>Zoom: {scale}</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="0"
                  max="10"
                  step="0.1"
                  defaultValue="1"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Opacity: {opacity}</label>
                <input
                  name="opacity"
                  type="range"
                  onChange={this.handleOpacity}
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Gradient Y0: {gradientY0}</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY0}
                  min="0"
                  max="3000"
                  step="10"
                  value={gradientY0}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Gradient Y1: {gradientY1}</label>
                <input
                  name="gradient"
                  type="range"
                  onChange={this.handleGradientY1}
                  min="0"
                  max="3000"
                  step="10"
                  value={gradientY1}
                  style={formStyles.control}
                />
              </div>

              <div style={formStyles.controlContainer}>
                <label>Rotate:</label>
                <RaisedButton onTouchTap={this.handleRotateLeft} style={formStyles.button}>Left</RaisedButton>
                <RaisedButton onTouchTap={this.handleRotateRight} style={formStyles.button}>Right</RaisedButton>
              </div>

              <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <Checkbox
                  label="Resize Proportionally"
                  checked={this.state.resizeProportionally}
                  onCheck={this.handleUpdateCheck}
                  style={{ alignSelf: 'flex-end', width: 'auto' }}
                />
                <SelectField
                  floatingLabelText="Type"
                  value={this.state.ext}
                  onChange={this.handleChangeType}
                  style={{ flex: '1 1 auto', width: 'auto', margin: '0 8px' }}
                >
                  <MenuItem value="jpeg" primaryText="jpeg" />
                  <MenuItem value="png" primaryText="png" />
                </SelectField>
                <TextField
                  floatingLabelText="Width"
                  hintText="Width"
                  max={maxWidth}
                  min={1}
                  onChange={this.handleWidth}
                  style={{ flex: '1 1 auto', margin: '0 8px', width: 'auto' }}
                  type="number"
                  value={Math.round(width)}
                />
                <TextField
                  floatingLabelText="Height"
                  hintText="Height"
                  max={maxHeight}
                  min={1}
                  onChange={this.handleHeight}
                  style={{ flex: '1 1 auto', margin: '0 8px', width: 'auto' }}
                  type="number"
                  value={Math.round(height)}
                />
              </div>

            </div>
          </div>
        }
        {!editing && src && <img src={src} alt="form" style={{ alignSelf: 'center', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}/>}
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 4 }}>
          <RaisedButton
            label={loading ? <CircularProgress size={24} style={{ verticalAlign: 'middle' }} /> : this.renderLabel()}
            labelPosition="before"
            containerElement="label"
            style={{ flex: '1 1 auto', margin: 4, fontFamily }}
          >
            <input
              style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0 }}
              onChange={this.handleUpload}
              type="file"
            />
          </RaisedButton>
          {this.state.src &&
            <RaisedButton
              onTouchTap={this.handleImageRemove}
              type="button"
              label="Remove Image"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
            />
          }
        </div>
      </div>
    )
  }
}

ImageForm.propTypes = {
  fontFamily: PropTypes.object,
  image: PropTypes.object,
  onImageEdit: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired
}

export default ImageForm
