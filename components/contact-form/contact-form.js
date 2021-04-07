import React, { useState } from 'react'
import Icon from '@mdi/react'
import { mdiSend } from '@mdi/js'
import styles from './contact-form.scss'
import containerStyles from './contact-form-container.scss'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export function ContactformContainer(props) {
  const contactFormDetails = useContentfulEntryId("57BmNlPMn5pBZBBvPNIoLC").content
  const contactTitle = contactFormDetails && contactFormDetails.title
  const contactBody = contactFormDetails && contactFormDetails.bodyText
  const contactCover = contactFormDetails && contactFormDetails.media.fields.file.url
  console.log(contactCover)
  return (
    <div className="contact-form-container" style={{backgroundImage:`url("${contactCover}")`}}>
      <style jsx>{containerStyles}</style>
      <div></div>
      <article>
      <h2>{contactTitle}</h2>
      <div>{contactBody && documentToReactComponents(contactBody)}</div>
      {props.children}
      </article>
    </div>
  )
}

export default ({ email }) => {
  const [inputEmail, setInputEmail] = useState('')

  return (
    <form
      action={`https://formspree.io/${email}`}
      className='contact-form'
      method='POST'
      autoComplete='off'
    >
      <style jsx>{styles}</style>

      {/*name*/}
      <label>
        <input type='text' name="name" required='required' />
        <span>Name</span>
      </label>

      {/*email*/}
      <label>
        <input
          className={inputEmail.length > 0 && 'hasText'}
          onChange={event => setInputEmail(event.target.value)}
          type='email'
          required='required'
          name="email"
        />
        <span>email</span>
      </label>

      {/*message*/}
      <label>
        <input type='text' name="message" required='required' />
        <span>message</span>
      </label>

      <button aria-label="Contact us" type='submit'>
        <Icon color='white' size={1} path={mdiSend} /> SEND
      </button>
    </form>
  )
}
