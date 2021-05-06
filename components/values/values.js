import React from 'react'
import styles from './values.scss'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'

export default () => {
  const valuesEntryId = 'FDxG0apeGQvjsl4SkD1Gh'
  const values = useContentfulEntryId(valuesEntryId).content

  return (
    <>
      <style jsx>{styles}</style>
      {values && (
        <section className='partners'>
          <h2>{values && values.title}</h2>
          <ul>
            {values.values.map(({ fields },i) => (
              <li>
                <h3 className={"field-"+i}>{fields.title}</h3>
                <p>{fields.content}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
