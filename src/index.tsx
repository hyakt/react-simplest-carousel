import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Carousel from './Carousel';

const imgUrls = [
  'https://via.placeholder.com/200/FFFFFF/000000',
  'https://via.placeholder.com/200/00ff00/000000/',
  'https://via.placeholder.com/200/ff0000/000000/',
  'https://via.placeholder.com/200/0000ff/000000/'
]

ReactDOM.render(<Carousel imgUrls={imgUrls}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
