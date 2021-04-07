import styles from './sponsor-split.scss'
export default function SponsorSplit(props) {
    return (
      <div className="sponsor-split">
        <style jsx>{styles}</style>
        <div className="image"></div>
        {props.children}
      </div>
    )
  }