import React, {useState, useEffect, useRef} from 'react'
import styles from './Carousel.module.scss'

type Props = {elements: Array<{}>}

const Gallery = ({element}) => {
  return (
    <div className={styles.gallery}>
      {element}
    </div>
  )
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div
    className={ `slide-arrow ${direction}` }
    onClick={ clickFunction }>
    { glyph }
  </div>
)

const calculateOffsetX = (containerWidth, elementsLength) => {
  return containerWidth / elementsLength
}

const ThumbnailList = ({elements, callback}) => {
  const [style, setStyle] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);

  const ulList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setContainerWidth(ulList?.current?.offsetWidth || 0);
  }, [ulList.current]);

  const thumbnailWidth = 100;

  const onClick = (index) => {
    callback(index)
    const offsetX = calculateOffsetX(containerWidth, elements.length) * -1 * index;
    setStyle({transform: `translate3d(${offsetX}px, 0, 0`})
  }

  return (
    <div className={styles.thumbnailContainer}>
      <ul ref={ulList} className={styles.thumbnailList}>
        {elements.map((element, index) => {
          console.log(element)
          return (
            <li className={styles.thumbnailContent}
                style={{...style}}
                onClick={() => onClick(index)}>
              {element}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const Carousel = (props: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const previousSlide = () => {
    const lastIndex = props.elements.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex: currentImageIndex -1
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = props.elements.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    setCurrentImageIndex(index)
  }

  return (
    <div className={styles.carousel}>
      {/*
          <Arrow
          direction="left"
          clickFunction={ previousSlide }
          glyph="&#9664;" />
        */}
      <Gallery
        element={props.elements[currentImageIndex]} />
      <ThumbnailList
        elements={props.elements}
        callback={setCurrentImageIndex} />
      {/*
          <Arrow
          direction="right"
          clickFunction={ nextSlide }
          glyph="&#9654;" />
        */}
    </div>
  )
}

export default Carousel;
