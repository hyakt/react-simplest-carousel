import * as React from 'react'

type Props = {imgUrls: Array<string>}

const ImageSlide = ({url}) => {
  console.log(url)

  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    transition: 'background-image .3s ease-in-out',
  }

  return (
    <div className="image-slide" style={styles}></div>
  )
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={ `slide-arrow ${direction}` }
    onClick={ clickFunction }>
    { glyph }
  </div>
)

const ThumbnailList = ({imgUrls, callback}) => {

  const styles = {
    flex: '0 0 auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    width: '200px',
    transition: 'transform 100ms ease-out',
    minWidth: '0',
  }

  const [style, setStyle] = React.useState(styles)

  const onClick = (index) => {
    callback(index)
    setStyle({...styles, ...{transform: `translate3d(${index * -180}px, 0, 0)`}})
  }

  return (
    <ul className="image-list">
      {imgUrls.map((url, index) => {
        return <li style={{backgroundImage: `url(${url})`, ...style}} onClick={() => onClick(index)} />
      })}
    </ul>
  )
}

const Carousel = (props: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0)

  const previousSlide = () => {
    const lastIndex = props.imgUrls.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex: currentImageIndex -1
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = props.imgUrls.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    setCurrentImageIndex(index)
  }

  return (
    <div className="carousel">
      <Arrow
        direction="left"
        clickFunction={ previousSlide }
        glyph="&#9664;" />
      <ImageSlide url={ props.imgUrls[currentImageIndex] } />
      <ThumbnailList imgUrls={props.imgUrls} callback={setCurrentImageIndex} />
      <Arrow
        direction="right"
        clickFunction={ nextSlide }
        glyph="&#9654;" />
    </div>
  )
}

export default Carousel;
