import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import links from '../links.json'
import uuid from 'uuid/v4'
import styles from './navbar.scss'
import noticeStyles from './notice.scss'

function Notice() {
  const [show, setShow] = useState(true)
  return (
    <>
    <style jsx>{noticeStyles}</style>
    <div className={"notice"}>Help us become a charitable association <span>↑</span></div>

    </>
  )
}

export default () => {
  const [pathName, setPathName] = useState('')
  useEffect(() => setPathName(window.location.pathname), [pathName])

  return (
    <>
    <nav className='items'>
      <style jsx>{styles}</style>
      
      <ul>
        {/*loop json links*/}
        {links.map(({ id, title, url }) => (
          <li className={url === pathName && 'active'} key={uuid()}>
            <Link href={url}>
              <a rel='noopener' className={title === 'DONATE' && 'donate'}>
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
        <Notice />
    </nav>
    </>
  )
}
