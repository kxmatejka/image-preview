import React, { Component } from 'react';

export default class ImagePreview extends Component {
  static defaultProps = {
    width: 0,
    height: 0,
    enabledFormats: ['jpeg', 'png', 'gif', 'webp']
  }

  constructor (props) {
    super(props)

    this.fileReader = new FileReader()
    this.fileReader.addEventListener('load', this.handleLoadFile.bind(this))
  }

  componentDidMount () {
    this.setDefaultCssToCanvas()
  }

  componentWillUnmount () {
    this.fileReader.removeAllListeners()
  }

  componentWillReceiveProps (nextProps) {
    if (this.isFormatEnabled(nextProps.file.type)) {
      this.fileReader.readAsDataURL(nextProps.file)
    } else if (this.props.onError) {
      this.props.onError()
    }
  }

  /**
   * Draw an image
   */
  handleLoadFile () {
    const canvasContext = this.canvas.getContext('2d')
    const image = new Image()

    image.onload = () => {
      const ratio = image.width / image.height
      let scaledWidth, scaledHeight

      if (image.width > image.height) {
        scaledWidth = canvasContext.canvas.width
        scaledHeight = scaledWidth / ratio
      } else {
        scaledHeight = canvasContext.canvas.height
        scaledWidth = scaledHeight * ratio
      }

      canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
      canvasContext.drawImage(image, 0, 0, scaledWidth, scaledHeight)
    }
    image.src = this.fileReader.result
  }

  /**
   * @param requestedFormat
   * @returns {boolean}
   */
  isFormatEnabled (requestedFormat) {
    let result = false
    if (requestedFormat.includes('image')) {
      const suffixOnly = requestedFormat.substr(6, requestedFormat.length)
      result = this.props.enabledFormats.includes(suffixOnly)
    }

    return result
  }

  /**
   * Merge css object from style properties with canvas css
   */
  setDefaultCssToCanvas () {
    if (this.props.style instanceof Object) {
      Object.keys(this.props.style).map(key => {
        this.canvas.style[key] = this.props.style[key]
      })
    }
  }

  /**
   * @returns {XML}
   */
  render () {
    const {
      width,
      height
    } = this.props

    return (
      <canvas ref={(canvas) => {this.canvas = canvas}}
              width={width} height={height} />
    )
  }
}
