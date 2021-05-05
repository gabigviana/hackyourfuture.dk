import React, { useState } from 'react'
import Icon from '@mdi/react'
import { useForm, ValidationError } from '@formspree/react';
import { mdiSend } from '@mdi/js'
import styles from '../contact-form/contact-form.scss'
import containerStyles from '../contact-form/contact-form'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export function PartnershipContactHeader(props) {
  const contactFormDetails = useContentfulEntryId("57BmNlPMn5pBZBBvPNIoLC").content
  const contactBody = contactFormDetails && contactFormDetails.bodyText
  return (
    <div className="contact-form-container">
      <style jsx>{`
      .contact-form-container {
        padding-left: 1em;
        font-size: 0.8rem;
        max-width: 66.66%;
      }`}</style>
      <div>
        {contactBody && documentToReactComponents({...contactBody, content:contactBody.content.slice(1,2)})}
      </div>
    </div>
  )
}
const formspreeContactFormId = "moqyjyal"

export default () => {
  const [state, handleSubmit] = useForm(formspreeContactFormId);
  // const [inputEmail, setInputEmail] = useState('')

  if (state.succeeded) {
      return (
        <h2>Thank you for your message</h2>
      );
  }
  return (
    <>
    <PartnershipContactHeader />
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
        <input
          type='text'
          name="company"
        />
        <span>Company</span>
      </label>

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
        <input
          type='text'
          name="phone"
        />
        <span>Phone</span>
      </label>

      <label>
        <input type='text' id="message" name="message" />
        <span>Message</span>
      </label>

  
      <button type="submit" disabled={state.submitting}>
      <Icon color='white' size={1} path={mdiSend} /> <span>SEND</span>
      </button>
    </form>
    </>
  );
}

// export default ({ email }) => {
//   const [inputEmail, setInputEmail] = useState('')

//   return (
//     <form
//       action={`https://formspree.io/${email}`}
//       className='contact-form'
//       method='POST'
//       autoComplete='off'
//     >
//       <style jsx>{styles}</style>

//       {/*name*/}
//       <label>
//         <input type='text' name="name" required='required' />
//         <span>Name</span>
//       </label>

//       <label>
//         <input
//           type='text'
//           name="company"
//         />
//         <span>Company</span>
//       </label>


//       {/*email*/}
//       <label>
//         <input
//           className={inputEmail.length > 0 && 'hasText'}
//           onChange={event => setInputEmail(event.target.value)}
//           type='email'
//           required='required'
//           name="email"
//         />
//         <span>Mail</span>
//       </label>

//       {/*phone*/}
     
//       <label>
//         <input
//           type='text'
//           name="phone"
//         />
//         <span>Phone</span>
//       </label>

//       {/*message*/}
//       <label>
//         {/* <input type='text' name="message" required='required' /> */}
//         <textarea name="message" placeholder="Write a message"></textarea>
//       </label>

//       <button aria-label="Contact us" type='submit'>
//         <Icon color='white' size={1} path={mdiSend} /> SEND
//       </button>
//     </form>
//   )
// }
