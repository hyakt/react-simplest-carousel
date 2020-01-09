import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Carousel from './Carousel'

const getRandomColorCode = () => `#${'0123456789ABCDEF'.split('').sort(() => 0.5 - Math.random()).slice(0,6).join('')}`

const elements = () => [
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
  <div className='thumbnail-image' style={{background: `${getRandomColorCode()}`}} />,
]

ReactDOM.render(<Carousel elements={elements()}/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
