import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Carousel from './Carousel';

const imgUrls = [
  'https://via.placeholder.com/200/000000/FFFFFF.png',
  'https://via.placeholder.com/200/000000/00ff00/',
  'https://via.placeholder.com/200/000000/ff0000/',
  'https://via.placeholder.com/200/000000/0000ff/'
]

ReactDOM.render(<Carousel imgUrls={imgUrls}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
