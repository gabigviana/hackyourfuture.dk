import { useEffect, useRef, useState } from 'react'
import styles from './HozSlider.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useSwipeable } from 'react-swipeable'
import React from 'react';

function detectTouch(event) {
    const touch = event.touches[0];
    return ({
        clientX: touch.pageX,
        clientY: touch.pageY,
    })
}

export default function HozSlider(props) {

    const isMobile = props.viewportSize < 1000
    const elementWidth = isMobile ? props.mobileElementPercentageWidth : props.elementPercentageWidth

    // show slide index (default is 1, because we move one slide to the left)
    const [showSlide, setShowSlide] = useState(1)
    // offset is in vw (view-width) it is the number
    // used to offset the slider containers margin-left css propterty
    const [slideOffset, setSlideOffset] = useState(props.offsetDefault === 0 ? 0 : 50)

    const ref = useRef()
    const [isScrolling, setIsScrolling] = useState(false)
    const [clientX, setClientX] = useState(false)
    const handlers = {
        ref: ref,
        onMouseDown: (e) => {
            e.preventDefault()
            setIsScrolling(true)
            setClientX(e.clientX)
        },
        onMouseUp: (e) => {
            setIsScrolling(false)
        },
        onMouseMove: (e) => {
            if (isScrolling) {

                const direction = clientX < e.clientX ? "left" : "right"

                setClientX(e.clientX)

                const newOffset = direction === "left"
                    ? slideOffset - (elementWidth * ((isMobile ? 1 : props.offsetMultiplier) || 1))
                    : slideOffset + (elementWidth * ((isMobile ? 1 : props.offsetMultiplier) || 1))

                // do not scroll if it is before or after the slides
                if (newOffset < -50 || (newOffset > (elementWidth * props.entries.length) - 50)) {
                    setIsScrolling(false)
                    return false
                }

                setShowSlide(
                    direction === "left"
                        ? (showSlide - 1)
                        : (showSlide + 1)
                )

                setSlideOffset(newOffset)
                setIsScrolling(false)
            }
        },
    }
    if (isMobile) {
        handlers["onTouchStart"] = (e) => {
            const { clientX } = detectTouch(e)
            e.stopPropagation();
            handlers.onMouseDown({ preventDefault: e.preventDefault, clientX })
        }
        handlers["onTouchEnd"] = handlers.onMouseUp
        handlers["onTouchMove"] = (e) => {
            const { clientX } = detectTouch(e)
            e.stopPropagation();
            handlers.onMouseMove({ preventDefault: e.preventDefault, clientX })
        }
    }

    const slidesStyle = {
        width: ((elementWidth * props.entries.length) + "vw"),
        marginLeft: (-slideOffset + "vw")
    }

    return (
        <div className="hoz-slider-container">
            <section>
                <div className="hoz-slider-slides"  {...handlers} style={slidesStyle}>
                    {
                        props.entries && props.entries.map((testi, i) => (
                            <article key={i} className={showSlide === i ? "active" : ""} style={{ width: 100 / props.entries.length + "%" }}>
                                {props.renderElement(testi)}
                            </article>
                        ))
                    }
                </div>
            </section>
            <style jsx>{styles}</style>
        </div>
    )

}
export function ResponsiveHozSlider(props) {
    const [viewportSize, setViewportSize] = useState(false)
    useEffect(() => {
        setViewportSize(window.innerWidth)
    }, [])
    if (!viewportSize) return null
    return React.cloneElement(props.children, { viewportSize })
}