import styles from './CoverIntro.scss'
export default function VolunteerIntro(props) {
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
        <h1>Volunteer</h1>
        <h4>HackYourFuture is getting a lot of help from awesome volunteer mentors that want to help new people with an interest in programming.</h4>
        {props.children}
        </article>
      </div>
    )
  }