import * as React from 'react'

type Props = {imgUrls: Array<{}>}

const ImageSlide = ({url}) => {
  console.log(url)

  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '800px',
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

const ImageList = (imgUrls: Pick<Props, 'imgUrls'>) => {
  const styles = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    transition: 'background-image .3s ease-in-out',
  }

  return (
    imgUrls.map(url => {
      return <div className="image-list" style={{backgroundImage:url, ...styles}} />
    })
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
      <ImageList imgUrls={ props.imgUrls} />

      <Arrow
        direction="right"
        clickFunction={ nextSlide }
        glyph="&#9654;" />
    </div>
  )
}

export default Carousel;
