import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import links from '../links.json'
import uuid from 'uuid/v4'
import styles from './navbar.scss'

function Notice() {
  const [show, setShow] = useState(true)
  return (
    <>
    <style jsx global>{`
        .notice {
          font-family: "Work Sans";
          font-size: 0.8rem;
          background-color: #fd9240;
          padding: 0.5em 2em 0.5em 1em;
          position: fixed;
          right: -20%;
          opacity:0;
          top: 5em;
          transition: 400ms;
        }
        .notice.shown {
          top: 5em;
          right: 0;
          opacity:1;
        }
      `}</style>
    <div className={show ? "notice shown" : "notice"}>Help us become a charitable association <span>↑</span></div>

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
