import styles from './Testimonials.scss'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import HozSlider from '../hoz-slider/HozSlider'

const testimonialsContentfulId = "3Tdh2M1suz9A0CqC4a9S68"
export default function Testimonials(props) {
    const testimonials = useContentfulEntryId(testimonialsContentfulId).content
    const entries = testimonials && testimonials.listOfTestimonials
    if ( ! entries) return null
    return (
        <div className="testimonials-container">
            <h1>Testimonials</h1>
            <HozSlider
                elementPercentageWidth={66.66}
                renderElement={(element) => (
                    <div className="testimonial-content">
                        <a href={element.fields.website} target="_blank"><img src={element.fields.companyLogo.fields.file.url} /></a>
                        {documentToReactComponents(element.fields.quote)}
                        <h3>{element.fields.nameAndTitle}</h3>
                    </div>
                )}
                entries={entries}
                 />
           
            <style jsx>{styles}</style>
            <style jsx global>{`
                    .testimonial-content > p {
                        font-size: 1rem!important;
                        line-height: 1.65rem;
                    }
                    // .active {
                    //     transition: 125ms;
                    //     padding: 0 3em;
                    // }
                    div.testimonial-content {
                        margin: 2em;
                        background-color:#f9f9f9;
                        background-size: auto 15.5%;
                        background-position: center 1em;
                        background-repeat: no-repeat;
                        padding: 2em 2em 2em 2em;
                        text-align:center;
                    }
                    div.testimonial-content > h3 {
                        font-weight: 300;
                        font-size: 1rem;
                        line-height: 1.5rem;
                    }
                    div.testimonial-content > p {
                        font-family: "Mono Space", monospace;
                        margin: 1em 0;
                    }
                    div.testimonial-content > .testimonial-cover {
                        height: 100px;
                        width: 150px;
                        background-size: contain;
                        background-position: center center;
                        background-repeat: no-repeat;
                        margin: 0 auto;
                        margin-top: 2em;
                    }
                    div.testimonial-content > a > img {
                        max-width: 15%;
                    }
                    @media screen and (max-width: 768px) {
                        // .active {
                        //     transform:scale(1.15);
                        // }
                        .testimonial-content > p {
                            font-size: 0.8rem!important;
                            line-height: 1.25rem;
                        }
                        .testimonial-content > h3 {
                            font-size: 0.65rem!important;
                            line-height: 1rem;
                        }
                        .testimonial-content > h4 {
                            font-size: 1rem!important;
                            line-height: 1.2rem;
                        }
                    }
                `}</style>

        </div>
    )
}