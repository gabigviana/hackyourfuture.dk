import styles from './content.scss'
import React from 'react'
import PictureContentContainer from './ContentWithPicture'

export default ({ inContextOf, children, id = '' }) => {
  return (
    <div className='content' id={id}>
      <style jsx global>{`
        .content h3 {
          margin: 18px 0 18px;
        }
      `}</style>
      <style jsx>{styles}</style>
      {
        inContextOf === "about"
        && (
          <PictureContentContainer contentBoxesId={"UUqAW92t1ZX5bQwWGg7Dp"} />
        )
      }
      {
        inContextOf === "volunteer"
        && (
          <PictureContentContainer contentBoxesId={"5cd4lNgsvWNRjSjBP6mIBS"} />
        )
      }
      {
        inContextOf === "apply"
        && (
          <PictureContentContainer contentBoxesId={"5cd4lNgsvWNRjSjBP6mIBS"} />
        )
      }
      {inContextOf !== "volunteer" && children}
    </div>
  )
}
