import styles from './ContentWithPicture.scss'
import React from 'react'
import { useContentfulEntryId } from '../../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function ThreeCardLayout(props) {
    const contentBoxes = useContentfulEntryId(props.contentBoxesId).content
    if (!contentBoxes) return null
    const contentBoxesList = contentBoxes.contentBox
    return (
        <div className="container three-cards">
            <style jsx>{styles}</style>
            {
                contentBoxesList && contentBoxesList.map((contentBox, i) => (
                    <section key={i} className="content-container">
                        <div>
                            <img
                                src={contentBox.fields.coverPicture.fields.file.url}
                                alt={contentBox.fields.coverPicture.title}
                            />

                        </div>
                        <article>
                            <h1 className={contentBox.fields.heading.length > 30 ? "long-title" : ""}>{contentBox.fields.heading}</h1>
                            <p>{documentToReactComponents(contentBox.fields.content)}</p>
                        </article>
                    </section>
                ))
            }

        </div>
    )
}