import styles from './CoverContent.scss'
export default function CoverContent(props) {
    return (
      <div id={props.id || ""} className="cover-content-container" style={{backgroundImage:`url(${props.background})`}}>
          <style jsx>{styles}</style>
        <article className="content">
        {props.children}
        </article>
      </div>
    )
  }