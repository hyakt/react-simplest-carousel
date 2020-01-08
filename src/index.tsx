import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Carousel from './Carousel';

const imgUrls = [
  'https://via.placeholder.com/200/00FFFF/000000/',
  'https://via.placeholder.com/200/00FF00/000000/',
  'https://via.placeholder.com/200/ff0000/000000/',
  'https://via.placeholder.com/200/0000ff/000000/',
  'https://via.placeholder.com/200/F0F0FF/000000/',
  'https://via.placeholder.com/200/F92672/000000/',
  'https://via.placeholder.com/200/A6E22E/000000/',
  'https://via.placeholder.com/200/FD971F/000000/',
  'https://via.placeholder.com/200/66D9EF/000000/',
  'https://via.placeholder.com/200/AE81FF/000000/',
  'https://via.placeholder.com/200/E6DB74/000000/',
  'https://via.placeholder.com/200/75715E/000000/',
  'https://via.placeholder.com/200/272822/000000/',
]

ReactDOM.render(<Carousel imgUrls={imgUrls}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
