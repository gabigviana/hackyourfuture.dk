import styles from './StatsBoxes.scss'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'

const statsId = "2F1uQB5n1Y4hhQqZBryCZj"

export default function StatsBoxes(props) {

  const statsEntry = useContentfulEntryId(statsId).content
  const stats = statsEntry && statsEntry.stats
  if ( ! stats) return null
    return (
      <div className="stats-boxes-container">
          <style jsx>{styles}</style>
       
          {Object.keys(stats).map((key, i) => (
            <div key={i}>
              <h1>{stats[key]}</h1>
              <h2>{key}</h2>
            </div>
          ))}

      </div>
    )
  }