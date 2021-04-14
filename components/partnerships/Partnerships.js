import styles from './partnerships.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import Partners from '../partners/partners'
import Supporters from '../supporters/supporters'
const partnershipContent = {
    gold:"1fsazQdv9ylQGwpqeSyHll",
    silver:"3HeH4yz4x41ERoEdwymjFg",
    bronze:"2ajWDtvb2znFaZjtngXtfK",
}

const PartnershipContainer = (props) => {
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
                <button>Sign up</button>
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