import styles from './MissionVision.scss'
import { useContentfulEntryId } from '../../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const missionId = '78n7xxaJslhhZgyfenKIfY'
const visionId = '2fFr5cVrIsqSHp3Y5s0qkz'

export default function MissionVision() {
    const mission = useContentfulEntryId(missionId).content
    const vision = useContentfulEntryId(visionId).content

    if ( ! vision || ! mission) return null
    // missionTitle: mission.fields.title,
    // missionContent: mission.fields.content,
    // visionTitle: vision.fields.title,
    // visionContent: vision.fields.content
    return (
      <>
      <div className="mis-vis-columns">
      <div className="mission-vision-cover"></div>
        <style jsx>{styles}</style>
      {/* I hate this way of doing things; I agree, but what can we do? */}

        <style jsx global>{`
        h2 {
          margin: 0;
        }
        article p {
          margin-bottom: 12px;
        }
        article ul {
          list-style: disc;
          padding-left: 22px;
        }
        article ul li {
          padding-left: 8px;
        }
      `}</style>
      <div>
        <article>
          <div>
          <h2>{vision.title}</h2>
          {documentToReactComponents(vision.content)}
          </div>
          <div>
          <h3>Foreningen HackYourFuture</h3>
          <p>CVR: 38533193</p>
          <p>HackYourFuture is a non-profit organisation</p>
          </div>
        </article>
        <article>
          <h2>{mission.title}</h2>
          {documentToReactComponents(mission.content)}
        </article>
      </div>
      </div>
      </>
    )
  }