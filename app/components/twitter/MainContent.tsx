import { FC, useState } from 'react'
import cx from 'clsx'
import s from '@/styles/Twitter.module.scss'
import Twi from '@/components/twitter/TwiNews'
import TwitterSender from '@/components/twitter/ContentSenderBox'

const MainContent: FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <div className={cx(s.middel, s.main_content)}>
      <div className={s.fixed_top}>
        <div className={s.title}>Home</div>
        <div className={s.tab_titles}>
          <div className={s.tab} onClick={() => setTabIndex(0)}>
            <div className={cx(s.tab_pointer, { [s.selected]: tabIndex === 0 })}>For you</div>
          </div>
          <div className={s.tab} onClick={() => setTabIndex(1)}>
            <div className={cx(s.tab_pointer, { [s.selected]: tabIndex === 1 })}>Following</div>
          </div>
        </div>
      </div>
      {tabIndex === 0 && <RecommendedContent />}
      {tabIndex === 1 && <ConcernContent />}
    </div>
  )
}

const RecommendedContent: FC = () => (
  <div className={s.recommended_content}>
    <TwitterSender />
    <div className={s.twitter_list}>
      <Twi />
      <Twi />
      <Twi />
      <Twi />
    </div>
  </div>
)

const ConcernContent: FC = () => (
  <div className={s.concern_content}>
    <TwitterSender />
    <div className={s.twitter_list}>
      <div className={s.content_tip}>
        Nothing
      </div>
    </div>
  </div>
)

export default MainContent
