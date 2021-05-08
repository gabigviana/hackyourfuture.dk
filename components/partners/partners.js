import React from 'react'
import styles from './partners.scss'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'

function FixedLogoSize(props) {
  return (
    <div style={{
      backgroundImage:`url("${props.src}")`,
      backgroundPosition:"center center",
      backgroundSize:"80%",
      backgroundRepeat:"no-repeat",
      height: "inherit",
      margin:"0",
    }}> </div>
  )
}

export default () => {
  const partnersEntryId = '01vaQwhCtWAhCpI24OScSq'
  const partners = useContentfulEntryId(partnersEntryId).content

  const goldPartners =
    partners &&
    partners.partners.filter(partner => partner.fields.type === 'gold')
  const silverPartners =
    partners &&
    partners.partners.filter(partner => partner.fields.type === 'silver')
  const bronzePartners =
    partners &&
    partners.partners.filter(partner => partner.fields.type === 'bronze')

  return (
    <>
      <style jsx>{styles}</style>
      {partners && (
        <section className='partners'>
          {/* <h2>{partners.title}</h2> */}
          <ul className="gold-partners">
           
            {goldPartners.map((partner, i) => (
              <li key={i} className={partner.fields.type}>
                <a target='_blank' href={partner.fields.link}>
                  <img
                    src={partner.fields.logo.fields.file.url}
                    alt={partner.fields.logo.title}
                  />
                </a>
              </li>
            ))}
          </ul>
          <ul className="silver-partners">

            {silverPartners.map((partner, i) => (
              <li key={i} className={partner.fields.type}>
                <a target='_blank' href={partner.fields.link}>
                  <FixedLogoSize
                    maxWidth={"68px"}
                    src={partner.fields.logo.fields.file.url}
                  />
                </a>
              </li>
            ))}
          </ul>
          <ul className="bronze-partners">
            {bronzePartners.map((partner, i) => (
              <li key={i} className={partner.fields.type}>
                <a target='_blank' href={partner.fields.link}>
                  <FixedLogoSize
                    src={partner.fields.logo.fields.file.url}
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
