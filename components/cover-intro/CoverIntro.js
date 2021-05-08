import styles from './CoverIntro.scss'
export default function CoverIntro(props) {
    return (
      <div className="cover-intro-container">
          <style jsx>{styles}</style>
        <article className="content">
        <h1>About us</h1>
        <h4>HackYourFuture is a non-profit organisation that aims to train refugees, asylum seekers and other disadvantaged groups to become web-developers and empower them by opening the doors to a very in-demand job market.</h4>
        </article>
        <div className="cover"></div>
      </div>
    )
  }