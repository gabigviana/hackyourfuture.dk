import styles from './Classes.scss'
import Link from 'next/link'
import {ProvideDeadline} from '../apply-section/deadline/deadline'
import Timer from '../apply-section/deadline/timer'

function Deadline(props) {
  if ( ! props.deadline) return null
  return 
}

function ClassTrack(props) {
  const classTrack = props.classTrack
  const hasDeadline = props.deadline || ""
  const isCurrentClass = classTrack.level

  return (
    <div className={"class-track" + ( hasDeadline ? " next-class-track" : "")}>

      <div className="class-number">{classTrack.number}</div>
      <div className="class-description">{classTrack.description + hasDeadline}</div>

      {
        isCurrentClass ? (
          <div className="class-track-action class-current-level">
            <button disabled>{isCurrentClass}</button>
          </div>
        ) : (
          <div className="class-track-action class-application-deadline">
            <div className="class-application-deadline-countdown">
              {/* <Timer date={hasDeadline} /> */}
              Deadline
            </div>
            <Link href="/apply"><button>Apply</button></Link>
          </div>
        )
      }

      <style jsx>{styles}</style>
    </div>
  )
}

const mockClasses = [
  // next class
  {
    number: "Class 20",
    description: "Application Deadline: ",
    nextClass:true
  },
  // current class
  {
    number: "Class 19",
    description: "Started class: [Date]",
    level: "Javascript 1",
    currentClass:true
  },
]

export default function Classes(props) {
  // contentful / google sheets api mock
  const [nextClass, currentClass] = mockClasses
  return (
    <div className="classes">
      <ProvideDeadline>
        <ClassTrack classTrack={nextClass} />
      </ProvideDeadline>
      {/* <ClassTrack classTrack={currentClass} /> */}
      <style jsx>{styles}</style>
    </div>
  )
}