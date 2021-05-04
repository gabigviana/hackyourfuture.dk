import { useState } from 'react'
import styles from './partnerships.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import Partners from '../partners/partners'
import Supporters from '../supporters/supporters'
import PartnershipContactForm from './PartnershipContactForm'
const partnershipContent = {
    gold: "1fsazQdv9ylQGwpqeSyHll",
    silver: "3HeH4yz4x41ERoEdwymjFg",
    bronze: "2ajWDtvb2znFaZjtngXtfK",
}

const PartnershipType = (props) => {
    
    const partnersEntryId = '01vaQwhCtWAhCpI24OScSq'
    const partners = useContentfulEntryId(partnersEntryId).content

    const randomPartners = partners &&
    partners.partners.filter(partner => partner.fields.type === props.type)

    return React.cloneElement(props.children, {partners:randomPartners})
}

const PartnershipContainer = (props) => {
    
    const [showContactForm, setShowContactform] = useState(false)
    const partnership = useContentfulEntryId(props.id).content
    
    if (!partnership) return null
    
    return (
        <div className="partnership-model">
            <style jsx>{styles}</style>

            <div className="partnership-icon" style={{ backgroundImage: `url("${partnership.icon.fields.file.url}")` }}>
                <h2>
                    {partnership.title}
                </h2>
            </div>
            <section>
                {/* <p>{documentToReactComponents(partnership.description)}</p> */}
                <div className="partnership-price join-companies">
                    <h4>Join companies like</h4>
                    <div className="company-item">
                    {props.partners && props.partners.map(partner => (
                        <a target='_blank' href={partner.fields.link} style={{backgroundImage:`url(${partner.fields.logo.fields.file.url})`}}>
                       
                        </a>
                        ))}
                    </div>
                </div>
                <ul>
                    {partnership.perks.map((perk, i) => (
                        <li key={i}>
                            <h3>{perk.fields.title}</h3>
                            <p>We have described this with to add some depth to the perk</p>
                        </li>
                    ))}
                </ul>
                
                <div className="partnership-price">
                    <h4>Starting from</h4>
                    <h2>{partnership.priceStarts}</h2>
                </div>
                <button onClick={() => setShowContactform(!showContactForm)} className="partnership-cta-btn">{showContactForm ? "Close" : "Contact us"}</button>
                {
                    showContactForm && (
                        <div className="partnership-cta">
                        <PartnershipContactForm />
                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default function Partnerships(props) {

    return (
        <div className="partnerships-container">

            <style jsx>{styles}</style>

            <style global jsx>{`
                header.partnership-header > * {
                    width: 50%;
                    display: inline-block;
                    vertical-align: top;
                    text-align: left;
                    margin: 0;
                }
                header.partnership-header > h2 {
                    font-family: "Work Sans";
                    text-decoration: underline;
                    text-decoration-thickness: 4px;
                    font-size: 2rem;
                }
                header.partnership-header > p {
                    margin-top: 2em;
                }
                @media screen and (max-width: 768px) {
                    header.partnership-header {
                        padding: 2em;
                        margin-top: 0!important;
                    }
                    header.partnership-header > * {
                        width: 100%;
                    }
                }
                .join-companies > div {
                    padding: 1em 0;
                }
                .join-companies > div > * {
                    display: inline-block;
                    width: 50%;
                    vertical-align: top;
                    margin: 0;
                }
                .join-companies > div > img {
                    display: inline-block;
                    width: 15%;
                    vertical-align: top;
                    margin-right: 1em;
                }
            `}</style>
            {
                props.children && (
                    <header className="partnership-header">
                        {documentToReactComponents({ ...props.children, content: props.children.content.slice(0, 2) })}
                    </header>
                )
            }
            {
                Object.keys(partnershipContent).map((partnershipType, i) => (
                    <PartnershipType key={i} type={partnershipType}>
                        <PartnershipContainer type={partnershipType} id={partnershipContent[partnershipType]} />
                    </PartnershipType>
                ))
            }
            {/* <Partners />
            <Supporters /> */}

        </div>
    )
}