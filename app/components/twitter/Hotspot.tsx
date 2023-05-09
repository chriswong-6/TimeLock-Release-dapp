import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import cx from 'clsx'
import { useWindowSize, useMeasure } from 'react-use'
import s from '@/styles/Twitter.module.scss'

const fixedBottomOffset = 80

const Hotspot: FC = () => {
  const windowSize = useWindowSize()
  const [fixedBoxRef, fixedBoxSize] = useMeasure<HTMLDivElement>()
  const [topOffset, setTopOffset] = useState(0)
  useEffect(() => {
    setTopOffset(fixedBoxSize.height + fixedBottomOffset - windowSize.height)
  }, [fixedBoxSize.height, windowSize.height])
  return (
    <div className={cx(s.right, s.hotspot)}>
      <Search />
      <div ref={fixedBoxRef} className={s.fixed_bottom} style={{ top: `-${topOffset}px` }}>
        <Trend />
        <Famous />
        <Footer />
      </div>
    </div>
  )
}

const Search: FC = () => (
  <div className={s.search}>
    <div className={s.search_wrap}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className={s.search_icon}><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" fill='currentColor'></path></g></svg>
      <input className={s.search_input} type="text" placeholder='Search Twitter' />
    </div>
  </div>
)

const Trend: FC = () => (
  <div className={cx(s.trend, s.hotspot_panel)}>
    <div className={s.title}>What's Happening</div>
    <div className={s.keywords}>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>Music-Trending</span>
          <span className={s.keyword}>#Taylor and Joe</span>
          <span className={s.count}>99.8K Tweets</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>Trending in United States</span>
          <span className={s.keyword}>#taylor swift</span>
          <span className={s.count}>345K Tweets</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>Trending in United States</span>
          <span className={s.keyword}>#Jack Black</span>
          <span className={s.count}>21.4K Tweets</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>Trending</span>
          <span className={s.keyword}>#Lover</span>
          <span className={s.count}>205K Tweets</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      {/* <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>香港特别行政区 的趋势</span>
          <span className={s.keyword}>#XiJinping</span>
          <span className={s.count}>9.98万 推文</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div> */}
      {/* <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>香港特别行政区 的趋势</span>
          <span className={s.keyword}>#XiJinping</span>
          <span className={s.count}>9.98万 推文</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>香港特别行政区 的趋势</span>
          <span className={s.keyword}>#XiJinping</span>
          <span className={s.count}>9.98万 推文</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div>
      <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>香港特别行政区 的趋势</span>
          <span className={s.keyword}>#XiJinping</span>
          <span className={s.count}>9.98万 推文</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div> */}
      {/* <div className={s.item}>
        <div className={s.data}>
          <span className={s.area}>香港特别行政区 的趋势</span>
          <span className={s.keyword}>#XiJinping</span>
          <span className={s.count}>9.98万 推文</span>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.menu}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
      </div> */}
    </div>
    <div className={s.more}>Show more</div>
  </div>
)

const Famous: FC = () => (
  <div className={cx(s.famous, s.hotspot_panel)}>
    <div className={s.title}>Who to follow</div>
    <div className={s.famous_list}>
      <div className={s.item}>
        <Image className={s.avatar} src='/tokisakiyuu.png' alt='tokisakiyuu' width={48} height={48} />
        <div className={s.info}>
          <span className={s.username}>Avalanche</span>
          <span className={s.user_id}>@Avalanche</span>
        </div>
        <div className={s.subscribe}>Follow</div>
      </div>
      <div className={s.item}>
        <Image className={s.avatar} src='/tokisakiyuu.png' alt='tokisakiyuu' width={48} height={48} />
        <div className={s.info}>
          <span className={s.username}>Apple</span>
          <span className={s.user_id}>@Apple</span>
        </div>
        <div className={s.subscribe}>Follow</div>
      </div>
    </div>
    <div className={s.more}>Show more</div>
  </div>
)

const Footer: FC = () => (
  <div className={s.footer}>
    <span className={cx(s.link, s.sign)}>Terms of Service</span>
    <span className={cx(s.link, s.sign)}>Privacy Policy</span>
    <span className={cx(s.link, s.sign)}>Cookie Policy</span>
    <span className={cx(s.link, s.sign)}>Accessibility</span>
    <span className={cx(s.link, s.sign)}>Ads info</span>
    <span className={cx(s.link, s.sign)}>More...</span>
    <span className={s.sign}>@2023 Twitter,Inc.</span>
  </div>
)

export default Hotspot
