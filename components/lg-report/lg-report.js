// import React from 'react'

export default function LGReport(props) {
    return (
        <div className="lg-report-container" id="lg-report">

            <div>
            <img src="/static/lg-insight/lg-insight-logo.png" />
                <h3>LG Insight Evaluation report</h3>
                <p>This evaluation offers numbers examined by an independent third party so you know what to expect when you graduate from HackYourFuture or plan to hire a HackYourFuture graduate.</p>
                <p>The report about HackYourFuture in Danish</p>
                <a href="/static/lg-insight/Evalueringsrapport_HYF_LG Insight_22_03_21.pdf" target="_blank">Read the report</a>
                <a href="/static/lg-insight/EN_HYF_LG%20Insight_07042021.pdf" target="_blank">English summary</a>

            </div>

            <div>
                <img src="/static/images/DSJC_Member.png" width="280" className="dsjc-logo" />
            </div>
            <style jsx>{`
            .lg-report-container {
                margin: 0 auto;
                padding: 1rem 0 3rem 0;
                max-width: 80%;
                text-align: center;
            }
            .lg-report-container > div,
            .lg-report-container > img {
                display:inline-block;
                vertical-align: top;
                line-height: 2.5rem;
            }
            .lg-report-container > img {
                width: 140px;
                margin-left: -4em;
            }
            .lg-report-container > div {
                width: calc(50% - 2em);
                padding: 1em;
                text-align: left;
            }
            .lg-report-container > div:last-child {
                text-align: center;
            }
            .lg-report-container > div > img.dsjc-logo {
                width: 70%;
            }
            .lg-report-container > div > a {
                font-family: "Space Mono", monospace;
                margin-right: 1.5em;
                color: #293a7d;
            }

            @media screen and (max-width: 768px) {
                .lg-report-container {
                    padding: 0;
                    max-width: 95%;
                }
                .lg-report-container > div {
                    margin-top: 1em;
                    font-size: 1em;
                    width: 100%;
                    padding-left: 0em;
                    line-height: 2.5rem;
                }
            }
        `}</style>
        </div>
    )
}