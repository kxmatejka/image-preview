import React, { Component } from 'react';
import ImagePreview from '../src/';

export default class Example extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }

    this.handleChangeFile = this.handleChangeFile.bind(this)
  }

  handleChangeFile (event) {
    this.setState({
      files: event.target.files
    })
  }

  render () {
    return (
      <div>
        <h1>React image preview</h1>
        <fieldset>
          <label htmlFor="example" style={{display: 'block'}}>Select a file</label>
          <input type="file" id="example" onChange={this.handleChangeFile}/>
        </fieldset>
        <ImagePreview file={this.state.files[0]}
                      width={500} height={500}
                      style={{background: '#eee'}}
                      imageMaxWidth={750} imageMaxHeight={750} imageMaxSize={1000000}
                      onError={(e) => {
                        console.log(e.message)
                        console.log(e.value)
                      }} />
      </div>
    )
  }
}
