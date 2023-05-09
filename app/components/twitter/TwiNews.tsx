import { FC } from 'react'
import Image from 'next/image'
import s from '@/styles/Twitter.module.scss'

const Twi: FC = () => {
  return (
    <div className={s.twi}>
      <div className={s.twi_left}>
        <Image className={s.twi_avatar} src='/NASA.jpg' alt='NASA' width={50} height={50} />
      </div>
      <div className={s.twi_right}>
        <div className={s.meta}>
          <span className={s.username}>
            <span>NASA</span>
            <svg viewBox="0 0 22 22" aria-label="认证账号" role="img" className={s.official_sign}><g><path clipRule="evenodd" d="M12.05 2.056c-.568-.608-1.532-.608-2.1 0l-1.393 1.49c-.284.303-.685.47-1.1.455L5.42 3.932c-.832-.028-1.514.654-1.486 1.486l.069 2.039c.014.415-.152.816-.456 1.1l-1.49 1.392c-.608.568-.608 1.533 0 2.101l1.49 1.393c.304.284.47.684.456 1.1l-.07 2.038c-.027.832.655 1.514 1.487 1.486l2.038-.069c.415-.014.816.152 1.1.455l1.392 1.49c.569.609 1.533.609 2.102 0l1.393-1.49c.283-.303.684-.47 1.099-.455l2.038.069c.832.028 1.515-.654 1.486-1.486L18 14.542c-.015-.415.152-.815.455-1.099l1.49-1.393c.608-.568.608-1.533 0-2.101l-1.49-1.393c-.303-.283-.47-.684-.455-1.1l.068-2.038c.029-.832-.654-1.514-1.486-1.486l-2.038.07c-.415.013-.816-.153-1.1-.456zm-5.817 9.367l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="#829aab"></path></g></svg>
          </span>
          <span className={s.user_id}>@NASA</span>
          <span className={s.separator}>·</span>
          <span className={s.twi_time}>4 hours</span>
          <div className={s.twi_menu}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={s.icon}><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill='currentColor'></path></g></svg>
          </div>
        </div>
        <div className={s.twi_content}>Our <a className={s.link} href='https://twitter.com/NASAEarth'>@NASAEarth</a> & <a className={s.link} href='https://twitter.com/CenterForAstro'>@CenterForAstro</a> <a className={s.link} href='https://twitter.com/hashtag/TEMPO?src=hashtag_click'>#TEMPO</a> mission successfully launched. TEMPO will provide hourly, daytime measurements of air quality in North America. It will monitor three main pollutants and reveal disparities in exposure in our cities and communities: <a className={s.link} href='https://go.nasa.gov/40Q9v89'>https://go.nasa.gov/40Q9v89</a></div>
        <div className={s.twi_video}>
          <Image src='/twi-cover.jpeg' alt='twi-cover' fill style={{ objectFit: 'cover', zIndex: 9997 }} />
        </div>
        <div className={s.statistics}>
          <div className={s.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={s.item_icon}><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" fill='currentColor'></path></g></svg>
            <span>161</span>
          </div>
          <div className={s.item}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={s.item_icon}><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" fill='currentColor'></path></g></svg>
            <span>315</span>
          </div>
          <div className={s.item}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={s.item_icon}><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" fill='currentColor'></path></g></svg>
            <span>2,165</span>
          </div>
          <div className={s.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={s.item_icon}><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" fill='currentColor'></path></g></svg>
            <span>54万</span>
          </div>
          <div className={s.item}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={s.item_icon}><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" fill='currentColor'></path></g></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Twi
