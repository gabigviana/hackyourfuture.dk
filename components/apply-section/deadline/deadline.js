import React from 'react'
import useSWR from 'swr'
import Timer from './timer'
import { fetcher } from './helpers'
import { makeStyles } from '@material-ui/core/styles'
import Content from '../../layouts/content/content'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useContentfulEntryId } from '../../../contentful/contentful-hooks'

import styles from './deadline.scss'

// styling
const useStyles = makeStyles({
  deadline: {
    color: '#293a7d',
    textAlign: 'center',
    fontFamily: "'Space Mono', 'monospace'",
    padding: 0,
    paddingTop: '1rem',
    marginBottom: 0
  },
  newClassNumber: {
    padding: '0.5rem 0.8rem 0.6rem 0.8rem',
    backgroundColor: '#293A7D',
    color: '#FFFFFF',
    fontFamily: "'Space Mono', 'monospace'",
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'inline'
  },
  event: {
    fontFamily: "'Space Mono', 'monospace'",
    display: 'inline',
    marginTop: '1rem',
    '@media (max-width: 768px)': {
      marginTop: '2rem',
      paddingLeft: '0.9rem',
      display: 'block'
    }
  },
  dateOfEvent: {
    fontFamily: "'Space Mono', 'monospace'",
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  }
})

export function ProvideDeadline(props) {
  const { data, error } = useSWR('/api/deadline-data', fetcher)
  if (error) {
    console.log('Failed to fetch deadline data', { error })
  }

  let newClassNumber
  if (data && data.data[1][0]) {
    newClassNumber = data.data[1][0]
  }

  let applicationDeadline
  if (data && data.data[1][1]) {
    applicationDeadline = data.data[1][1]
  }

  let newClassStart
  if (data && data.data[1][2]) {
    newClassStart = data.data[1][2]
  }

  const applicationEndDate = new Date(applicationDeadline).toLocaleString(
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

// Link to the sheet: https://docs.google.com/spreadsheets/d/1KD6Dr9z5fxEzx-jxs84e0tBfpohTkup8GE4r3CC3qZA/edit#gid=0
export default function Deadline() {
  // const classes = useStyles()

  // const { data, error } = useSWR('/api/deadline-data', fetcher)
  // if (error) {
  //   console.log('Failed to fetch deadline data', { error })
  // }

  // let newClassNumber
  // if (data && data.data[1][0]) {
  //   newClassNumber = data.data[1][0]
  // }

  // let applicationDeadline
  // if (data && data.data[1][1]) {
  //   applicationDeadline = data.data[1][1]
  // }

  // let newClassStart
  // if (data && data.data[1][2]) {
  //   newClassStart = data.data[1][2]
  // }

  const classDeadlineEntryId = 'BlGRwiiDBmhfwUXWIJukB'
  const classDeadlineEntry = useContentfulEntryId(classDeadlineEntryId).content
  if ( ! classDeadlineEntry) return null
  const {classNumber, deadline} = classDeadlineEntry
  console.log(classNumber, deadline)
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
