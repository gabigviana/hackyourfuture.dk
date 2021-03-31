import styles from './Testimonials.scss'

export default function Testimonials(props) {
    const mockTest = {
        heading:"Munin Data (https://munindata.org/)",
        content:`"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author:"- Jorge C. Leitão, Co-Founder, Data Scientist"
    }
   
    return (
        <div className="testimonials-container">
            <h1>Testimonials</h1>

            <section>
                <article className="testimonial-navigator"><div><div className="arrow arrow-left"></div></div></article>
                <article>
                    <div className="testimonial-content">
                        <h3>{mockTest.heading}</h3>
                        <p>{mockTest.content}</p>
                        <h4>{mockTest.author}</h4>
                    </div>
                </article>
                <article className="testimonial-navigator"><div><div className="arrow arrow-right"></div></div></article>
            </section>

            <style jsx>{styles}</style>
        </div>
    )
}