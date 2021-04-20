import { useEffect, useRef, useState } from 'react'
import styles from './Testimonials.scss'

const mockTest = [
    {
        heading: "Munin Data (https://munindata.org/)",
        content: `"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author: "- Jorge C. Leitão, Co-Founder, Data Scientist"
    },
    {
        heading: "Munin Data (https://munindata.org/)",
        content: `"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author: "- Jorge C. Leitão, Co-Founder, Data Scientist"
    },
    {
        heading: "Munin Data (https://munindata.org/)",
        content: `"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author: "- Jorge C. Leitão, Co-Founder, Data Scientist"
    },
    {
        heading: "Munin Data (https://munindata.org/)",
        content: `"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author: "- Jorge C. Leitão, Co-Founder, Data Scientist"
    },
    {
        heading: "Munin Data (https://munindata.org/)",
        content: `"HackYourFuture has been instrumental to growing and nurturing much needed frontend developers into the Danish market. We hired Richard Paredes directly from HackYourFuture. He has been fundamental in developing our frontend capabilities, as well as helping our customers to get the most out of the software solutions."`,
        author: "- Jorge C. Leitão, Co-Founder, Data Scientist"
    }
]
export default function Testimonials(props) {

    const slideCount = mockTest.length
    const slideWidth = typeof window !== "undefined" && window.innerWidth
    const slideDistance = slideWidth / 1.67

    const [showSlide, setShowSlide] = useState(1)

    const [slideOffset, setSlideOffset] = useState(0)

    useEffect(() => {
        setSlideOffset(-Math.abs((slideWidth / 2.6)))
    }, [])

    const slideIt = (direction) => {
        // If next slide is the last
        if (showSlide === (slideCount - 1) && direction === "right") {
            setTimeout(() => setSlideOffset(slideDistance * 0.43), 1)
            return setShowSlide(0)
        } // if next slide is before the first
        else if (showSlide === 0 && direction === "left") {
            setTimeout(() => setSlideOffset(-Math.abs(((slideDistance * (slideCount - 1) * 0.9)))), 1)
            return setShowSlide(slideCount - 1)
        }

        setShowSlide(
            direction === "left"
                ? (showSlide - 1)
                : (showSlide + 1)
        )
        setSlideOffset(
            direction === "left"
                ? slideOffset + slideDistance
                : slideOffset - slideDistance
        )

    }
    // put the last one first   

    return (
        <div className="testimonials-container">
            <h1>Testimonials</h1>
            <section>
                <div className="testimonial-navigator">
                    <div className="arrow arrow-left" onClick={() => slideIt("left")}></div>
                </div>

                <div className="testimonials-slides" style={{ left: (slideOffset + "px") }}>
                    {
                        mockTest.map((testi, i) => (
                            <article key={i} className={showSlide === i ? "active" : ""}>
                                <div className="testimonial-content">
                                    <h3>{testi.heading}</h3>
                                    <p>{testi.content}</p>
                                    <h4>{testi.author}</h4>
                                </div>
                            </article>
                        ))
                    }
                </div>

                <div className="testimonial-navigator">
                    <div className="arrow arrow-right" onClick={() => slideIt("right")}></div>
                </div>
            </section>


            <style jsx>{styles}</style>

        </div>
    )

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