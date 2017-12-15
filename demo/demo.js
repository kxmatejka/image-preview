import { AppContainer } from 'react-hot-loader';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Example from './Example'

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

render(Example)
if (module.hot) {
  module.hot.accept('./Example', () => render(Example))
}
