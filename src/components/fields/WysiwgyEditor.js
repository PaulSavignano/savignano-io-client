import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { convertToRaw, EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class WysiwgyEditor extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    colors: PropTypes.array,
    fonts: PropTypes.array,
    isFetching: PropTypes.bool
  }
  state = {
    editorState: null,
    typing: false,
  }
  componentWillMount() {
    if (this.props.value) {
      const blocksFromHtml = htmlToDraft(this.props.value);
      const contentBlocks = blocksFromHtml.contentBlocks;
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      const editorState = EditorState.createWithContent(contentState)
      this.setState({ editorState })
    }
  }
  onEditorStateChange = (editorState) => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({ editorState })
    this.props.onChange(html)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value === '') {
      this.setState({
        ...this.state,
        editorState: null
      })
    }
  }
  render() {
    const { editorState } = this.state
		const {
      backgroundColor,
      borderColor,
      isFetching,
      input,
      colors,
      fonts
    } = this.props
    return (
      !isFetching &&
        <Editor
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onEditorStateChange}
          {...input}
          toolbarStyle={{ backgroundColor, color: '#000000', borderBottom: `1px solid ${borderColor}` }}
          wrapperStyle={{ border: `2px solid ${borderColor}`, overflow: 'auto' }}
          toolbar={{
            fontFamily: {
              options: fonts.filter((value, index, self) => value && self.indexOf(value) === index).sort(),
            },
            colorPicker: { colors },
            inline: { inDropdown: true },
            list: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
        />
    )
  }
}

const mapStateToProps = ({
  brand: {
    appBar: { values },
    isFetching,
    palette: { values: palette },
    typography: { values: { fontFamily }}
  }
}) => ({
  backgroundColor: palette.canvasColor,
  borderColor: palette.borderColor,
  colors: Object.keys(palette).map(key => palette[key]).filter((item, i, self) => i === self.indexOf(item)),
  fonts: [
    fontFamily,
    values.fontFamily,
    'Dancing Script, cursive',
    'Futura, sans-serif'
  ],
  isFetching,
})

export default connect(mapStateToProps)(WysiwgyEditor)
