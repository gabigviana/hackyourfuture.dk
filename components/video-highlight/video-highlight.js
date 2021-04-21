import styles from './video-highlight.scss'

const Iframe = props => (
  <>
    <style jsx>{styles}</style>
    <iframe src={props.src} height={props.height} frameBorder='0' />
  </>
)

export default ({ title, content }) => (
  <>
    <style jsx>{styles}</style>
    <section className='video-highlight' id='zuhair-success-story'>
      <h2>{title}</h2>
      <div className='wrapper'>
        <p>{content}</p>

        <Iframe
          src={`https://player.vimeo.com/video/390957830?color=293a7d&title=0&byline=0&portrait=0`}
          width='640'
          height='337'
        />
      </div>
    </section>
  </>
)
