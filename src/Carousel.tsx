import React, {useState, useEffect, useRef, ReactElement} from 'react'
import styles from './Carousel.module.scss'

interface Props {elements: Array<ReactElement>}

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

const ThumbnailList = (
  {elements, callback}: {elements: Array<ReactElement>, callback: (index: number) => void}
) => {
  const [style, setStyle] = useState({});
  const [thumbnailsOffsetWidth, setThumbnailsOffsetWidth] = useState(0);
  const [thumbnailsScrollWidth, setThumbnailsScrollWidth] = useState(0);
  const [thumbnailsTranslate, setThumbnailsTranslate] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  const ulList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // 表示されている要素の幅
    setThumbnailsOffsetWidth(ulList?.current?.offsetWidth || 0);
    // スクロールできる要素の幅 要素あたりの幅 * length
    setThumbnailsScrollWidth(ulList?.current?.scrollWidth || 0)
    console.log('thumbnails container offsetWidth', ulList?.current?.offsetWidth || 0)
    console.log('thumbnails container scrollWidth', ulList?.current?.scrollWidth || 0)
  }, [ulList.current]);

  useEffect(() => {
    setStyle({transform: `translate3d(${thumbnailsTranslate}px, 0, 0)`})
  }, [thumbnailsTranslate])

  const scrollThumbnails = (currentIndex: number): void => {
    if( thumbnailsOffsetWidth <= thumbnailsScrollWidth || thumbnailsOffsetWidth <= 0){
      // スクロール可能なトータルの量を計算
      const totalScroll = thumbnailsScrollWidth - thumbnailsOffsetWidth
      // indexあたりのスクロール量を計算
      const perIndexScroll = totalScroll / elements.length
      // 移動量を計算
      const distance = perIndexScroll * Math.abs(previousIndex - currentIndex)

      if (distance > 0) {
        if (previousIndex < currentIndex) {
          setThumbnailsTranslate(thumbnailsTranslate - distance);
        } else if (previousIndex > currentIndex) {
          setThumbnailsTranslate(thumbnailsTranslate + distance);
        }
      }
      setPreviousIndex(currentIndex)
    }
  }

  const addBorderRect = (currentIndex: number): void => {
    const liCollection = Array.from(ulList.current?.children as HTMLCollection)
    liCollection.forEach((elm: Element) => {
      console.log(elm)
      elm.removeAttribute('style')
    })

    const targetNode = ulList.current?.children[currentIndex]
    targetNode?.setAttribute('style', "border: 4px solid #333")
  }

  const onClick = (currentIndex: number): void => {
    callback(currentIndex)
    scrollThumbnails(currentIndex)
    addBorderRect(currentIndex)
  }

  return (
    <div className={styles.thumbnailContainer}>
      <ul ref={ulList}
          className={styles.thumbnailList}
          style={style}>
        {elements.map((element, index) => {
          return (
            <li className={styles.thumbnailContent}
                onClick={() => onClick(index)} >
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
