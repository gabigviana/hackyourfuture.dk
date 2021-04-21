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
        <h4>Our teachers and mentors are all volunteers. They play a vital role in supporting and preparing the students as well as possible for landing their first developer job.</h4>
        {props.children}
        </article>
      </div>
    )
  }