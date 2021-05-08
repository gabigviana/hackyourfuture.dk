import styles from './internationalPartners.scss'
const contenfulId = "11MBXH2BLOQpyt4GU8K74Y"
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function InternationalPartners(props) {
    const partnerContent = useContentfulEntryId(contenfulId).content
    if (!partnerContent) return null
    const mapCover = partnerContent && partnerContent.mapCover.fields.file.url
    const partners = partnerContent && partnerContent.intlPartner

    return (
        <div className="international-partners" style={{backgroundImage:`url("${mapCover}")`}}>
            <style jsx>{styles}</style>
            <h2>HackYourFuture family</h2>
            <div className="partner-list">
                {
                    partners.map((partner,i) => (
                        <div key={i} data-aos="fade-in">
                            <img src={partner.fields.partnerLogo.fields.file.url} />
                            <article>
                            <h3>{partner.fields.partnerName}</h3>
                            <a href={partner.fields.partnerUrl} target="_blank">Visit partner</a>
                            </article>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}