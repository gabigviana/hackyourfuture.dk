import React from 'react'
import Timer from './timer'
import { useContentfulEntryId } from '../../../contentful/contentful-hooks'

import styles from './deadline.scss'

export function ProvideDeadline(props) {
  const classDeadlineEntryId = 'BlGRwiiDBmhfwUXWIJukB'
  const classDeadlineEntry = useContentfulEntryId(classDeadlineEntryId).content
  if ( ! classDeadlineEntry) return null
  const {classNumber, deadline} = classDeadlineEntry
  const applicationEndDate = new Date(deadline).toLocaleString(
    'en',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )
  return React.cloneElement(props.children, Object.assign({}, props, {
    deadline: applicationEndDate
  }))
}

export default function Deadline() {

  const classDeadlineEntryId = 'BlGRwiiDBmhfwUXWIJukB'
  const classDeadlineEntry = useContentfulEntryId(classDeadlineEntryId).content
  if ( ! classDeadlineEntry) return null
  const {classNumber, deadline} = classDeadlineEntry
  const applicationEndDate = new Date(deadline).toLocaleString(
    'en',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )

  if ( ! classDeadlineEntry) {
    return null
  } else {
    return (
      <div className="next-class-deadline">
        <style jsx>{styles}</style>
        <div className="class-details">
        <div className="class-number">{classNumber}</div>
        <div className="class-deadline"> Application Deadline:  <span>{applicationEndDate}</span></div>
        </div>
        <Timer date={applicationEndDate} />
      </div>
    )
  }
}
