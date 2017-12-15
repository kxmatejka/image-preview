import React, { Component } from 'react';

export default class ImagePreview extends Component {
  /**
   * @param props
   */
  constructor (props) {
    super(props)

    this.handleLoadFile = this.handleLoadFile.bind(this)
    this.fileReader = new FileReader()
    this.fileReader.addEventListener('load', this.handleLoadFile)
  }

  /**
   * Cleanup
   */
  componentWillUnmount () {
    this.fileReader.removeAllListeners()
  }

  /**
   * When component receive new file
   *
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    this.fileReader.readAsDataURL(nextProps.file)
  }

  /**
   * Draw image
   */
  handleLoadFile () {
    const canvasContext = this.refs.canvas.getContext('2d')
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
   * @returns {XML}
   */
  render () {
    const {
      width,
      height
    } = this.props

    return (
      <canvas ref="canvas" width={width} height={height} />
    )
  }
}
