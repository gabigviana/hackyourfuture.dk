import styles from './CoverIntro.scss'
export default function ApplyIntro(props) {
  if (props.inContextOf === "faq") {
    return (
      <div className="cover-intro-container volunteer-intro volunteer-faq">
          <style jsx>{styles}</style>
        <article className="content">
        {props.children}
        </article>
      </div>
    )
  }
    return (
      <div className="cover-intro-container volunteer-intro">
          <style jsx>{styles}</style>
        <article className="content">
        {props.children}
        </article>
      </div>
    )
  }