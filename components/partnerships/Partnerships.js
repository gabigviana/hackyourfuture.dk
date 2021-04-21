import {useState} from 'react'
import styles from './partnerships.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import Partners from '../partners/partners'
import Supporters from '../supporters/supporters'
import PartnershipContactForm from './PartnershipContactForm'
const partnershipContent = {
    gold:"1fsazQdv9ylQGwpqeSyHll",
    silver:"3HeH4yz4x41ERoEdwymjFg",
    bronze:"2ajWDtvb2znFaZjtngXtfK",
}

const PartnershipContainer = (props) => {
    const [showContactForm, setShowContactform] = useState(false)
    const partnership = useContentfulEntryId(props.id).content
    if ( ! partnership) return null
    return (
        <div className="partnership-model">
        <style jsx>{styles}</style>

            <div className="partnership-icon" style={{backgroundImage:`url("${partnership.icon.fields.file.url}")`}}>
                <h2>
                {partnership.title}
                </h2>
            </div>
            <section>
                <p>{documentToReactComponents(partnership.description)}</p>
                <ul>
                    {partnership.perks.map((perk, i) => (
                        <li key={i}>{perk.fields.title}</li>
                    ))}
                </ul>
                        <div className="partnership-price">
                        <h4>Starting from</h4>
                        <h2>{partnership.priceStarts}</h2>
                        </div>
                <button onClick={() => setShowContactform( ! showContactForm)} className="partnership-cta-btn">{showContactForm ? "Close" : "Contact our staff"}</button>
               
                {
                    showContactForm && (
                        <PartnershipContactForm />
                    )
                }
            </section>
        </div>
    )
} 

export default function Partnerships(props) {

    return (
        <div className="partnerships-container" id="partnerships">

            <style jsx>{styles}</style>

            <style global jsx>{`
                header.partnership-header > * {
                    width: 50%;
                    display: inline-block;
                    vertical-align: top;
                    text-align: left;
                    margin: 0;
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
            `}</style>
            {
                props.children && (
                    <header className="partnership-header">
                    {documentToReactComponents({...props.children, content:props.children.content.slice(0,2)})}
                    </header>
                )
            }
        
            {
                Object.keys(partnershipContent).map((partnershipType, i) => (
                    <PartnershipContainer key={i} id={partnershipContent[partnershipType]} />
                ))
            }
        <Partners />
      <Supporters />

        </div>
    )
}