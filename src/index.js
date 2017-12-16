import React, { Component } from 'react';
import ValidationError from './ValidationError'

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
    const file = nextProps.file

    if (!this.isFormatAllowed(file.type)) {
      this.invokeError('unsupported format', file.type)
    } else if (!this.isSizeAllowed(file.size)) {
      this.invokeError('file is too large', file.size)
    } else {
      this.fileReader.readAsDataURL(file)
    }
  }

  /**
   * Draw an image
   */
  handleLoadFile () {
    const canvasContext = this.canvas.getContext('2d')
    const image = new Image()

    image.onload = () => {
      if (!this.isDimensionAllowed(image.width, image.height)) {
        this.invokeError('maximal dimensions violated', `${image.width}x${image.height}`)
      } else {
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
    }
    image.src = this.fileReader.result
  }

  /**
   * @param requestedFormat
   * @returns {boolean}
   */
  isFormatAllowed (requestedFormat) {
    let result = false
    if (requestedFormat.includes('image')) {
      const suffixOnly = requestedFormat.substr(6, requestedFormat.length)
      result = this.props.enabledFormats.includes(suffixOnly)
    }

    return result
  }

  /**
   * @param fileSize
   * @returns {boolean}
   */
  isSizeAllowed (fileSize) {
    return (this.props.imageMaxSize !== undefined && fileSize <= this.props.imageMaxSize)
  }

  /**
   * @param width
   * @param height
   * @returns {boolean}
   */
  isDimensionAllowed (width, height) {
    return (
      (this.props.imageMaxWidth !== undefined && width <= this.props.imageMaxWidth) &&
      (this.props.imageMaxHeight !== undefined && height <= this.props.imageMaxHeight)
    )
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
   * @param message
   * @param value
   */
  invokeError (message, value) {
    if (this.props.onError) {
      this.props.onError(new ValidationError(message, value), this.canvas)
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
