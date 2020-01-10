import React, {useState, useEffect, useRef, ReactElement} from 'react'
import styles from './Carousel.module.scss'

type Props = {elements: Array<ReactElement>}
type GalleryProps = {element: ReactElement}
type ThumbnailsProps = {
  elements: Array<ReactElement>,
  setCurrentImageIndex: (index: number) => void,
}

const Gallery: React.FC<GalleryProps> = ({element}) => {
  return (
    <div className={styles.gallery}>
      {element}
    </div>
  )
}

const Thumbnails: React.FC<ThumbnailsProps> = ({elements, setCurrentImageIndex}) => {
  const [thumnailsStyle, setThumnailsStyle] = useState({});
  // offset: 表示されている要素の幅, scroll: スクロールできる要素の幅
  const [thumnailsListWidth, setThumnailsListWidth] =
    useState<{offset: number, scroll: number}>({offset: 0, scroll: 0});
  // サムネイル一覧の移動距離
  const [thumbnailsTranslate, setThumbnailsTranslate] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  const ulList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setThumnailsListWidth({
      offset: ulList?.current?.offsetWidth || 0,
      scroll: ulList?.current?.scrollWidth || 0
    });
  }, [ulList.current]);

  // todo: useEffectじゃなくても良いか検討
  useEffect(() => {
    setThumnailsStyle({transform: `translate3d(${thumbnailsTranslate}px, 0, 0)`})
  }, [thumbnailsTranslate])

  /**
   * サムネイルリストの移動量を計算し設定する
   *
   * @param currentIndex - 選択したサムネイルのインデックス
   */
  const translateThumbnails = (currentIndex: number): void => {
    if( thumnailsListWidth.offset <= thumnailsListWidth.scroll || thumnailsListWidth.offset <= 0){
      // スクロール可能なトータルの量を計算
      const totalScroll = thumnailsListWidth.scroll - thumnailsListWidth.offset
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

  /**
   * サムネイルの外枠のボーダーを設定する
   *
   * @param currentIndex - 選択したサムネイルのインデックス
   */
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
    setCurrentImageIndex(currentIndex)
    translateThumbnails(currentIndex)
    addBorderRect(currentIndex)
  }

  return (
    <div className={styles.thumbnailsContainer}>
      <ul ref={ulList}
          className={styles.thumbnailsList}
          style={thumnailsStyle}>
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

const Carousel: React.FC<Props> = props => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className={styles.carousel}>
      <Gallery
        element={props.elements[currentImageIndex]} />
      <Thumbnails
        elements={props.elements}
        setCurrentImageIndex={setCurrentImageIndex} />
    </div>
  )
}

export default Carousel;
