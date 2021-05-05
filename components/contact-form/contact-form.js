import React, { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react';
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

const formspreeContactFormId = "xnqljonp"

export default ({ email }) => {
  const [state, handleSubmit] = useForm(formspreeContactFormId);
  // const [inputEmail, setInputEmail] = useState('')

  if (state.succeeded) {
      return (
        <h2>Thank you for your message</h2>
      );
  }
  return (
      <form onSubmit={handleSubmit} className='contact-form'>
      <style jsx>{styles}</style>

      <label>
        <input type='text' id="name" name="name" required='required' />
        <span>Name</span>
      </label>


      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />

      <label>
        <input type='email' id="email" name="email" required='required' />
        <span>Email</span>
      </label>

      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />

      <label>
        <input type='text' id="message" name="message" />
        <span>Message</span>
      </label>

  
      <button type="submit" disabled={state.submitting}>
      <Icon color='white' size={1} path={mdiSend} /> <span>SEND</span>
      </button>
    </form>
  );
}