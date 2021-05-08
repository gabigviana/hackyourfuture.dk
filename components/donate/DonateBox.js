import { useEffect, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'

import styles from './DonateBox.scss'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const donationTermsId = "2Ai5kEf0DXTFVFiB6ktKD4"
function DonationTerms(props) {
    const contentfulTerms = useContentfulEntryId(donationTermsId).content
    if (!contentfulTerms) return null
    const termsCopy = contentfulTerms && contentfulTerms.mainBody
    return (
        <article id="donation-terms">
            <style global jsx>{`
                #donation-terms {
                    padding: 2em;
                    margin-top: 1em;
                    background: #fff;
                    max-height: 320px;
                    overflow-y:auto;
                }
            `}</style>
            <h3>{contentfulTerms.headline}</h3>
            {documentToReactComponents(termsCopy)}
        </article>
    )
}


const suggestions = [250, 500, 1000]

function createStripeDonation(stripe, donationDetails) {
    return fetch("/api/donate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(donationDetails)
    }).then((rsp) => rsp.json()).then((rsp) => {
        return stripe.redirectToCheckout({ sessionId: rsp.id });
    })
}

function ResolveStripe(props) {
    const [stripeSession, setSession] = useState(true)
    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY).then(setSession)
    }, [])
    if (!stripeSession) return null
    if (stripeSession) {
        return React.cloneElement(props.children, { ...props, stripe: stripeSession })
    }
}

const mxonthlyBudget = 214400
const monthlyBudget = 200000
function donationAmountDescription(amount) {
    const pert = Math.abs((((amount) / monthlyBudget) * 100))
    return `supports ${pert.toFixed(2)} % of our ideal monthly budget`
}

function StripeDonation(props) {

    const [showTerms, setShowTerms] = useState(false)

    const [donationType, setDonationType] = useState("yearly")
    const [donationAmount, setDonationAmount] = useState(250)
    const [donationMessage, setDonationMessage] = useState(false)

    const [isSubmitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)

    const createDonation = () => {
        setSubmitError(false)
        setSubmitting(true)
        if (!donationType || !donationAmount) {
            setSubmitting(false)
            const error = []
            if (!donationType) error.push("donation type")
            if (!donationAmount) error.push("amount")
            return setSubmitError("Please select a " + error.join(" and "))
        }
        createStripeDonation(props.stripe, {
            type: donationType,
            amount: donationAmount,
            message: donationMessage || ""
        }).then((rsp) => {
            setTimeout(() => setSubmitting(false), 500)
        })
    }


    return (
        <div className="stripe-donation">
            <style jsx>{styles}</style>

            <form className="donation-type">
                <div>
                    <input type="radio" name="donation-type" checked={donationType === "yearly" ? true : false} value="yearly" onClick={() => setDonationType("yearly")} />
                    <label> Yearly</label>
                </div>
                <div>
                    <input type="radio" name="donation-type" checked={donationType === "monthly" ? true : false} value="monthly" onClick={() => setDonationType("monthly")} />
                    <label> Monthly</label>
                </div>
                <div>
                    <input type="radio" name="donation-type" checked={donationType === "one-time" ? true : false} value="one-time" onClick={() => setDonationType("one-time")} />
                    <label>One time</label>
                </div>
            </form>

            <ul className="donation-amount">
                {suggestions.map((amount, i) => (
                    <li key={i} className={donationAmount == amount ? "selected-amount" : ""} onClick={() => setDonationAmount(amount)}><label>{amount} <span>dkk</span></label></li>
                ))}
                <li className="input-amount">
                    <input type="number" onChange={(e) => setDonationAmount(e.target.value)} placeholder="Other amount" name="donation-type" value={donationAmount || ""} />
                </li>
            </ul>

            <div className="amount-description">
                <h3><span>{donationAmount} dkk</span> {donationAmountDescription(donationAmount)} {donationType === "monthly" && (" every month")} {donationType === "yearly" && (" every year")}</h3>
            </div>


            <div className="donation-message">
                <label>Message</label>
                <textarea id="donation-message-text" value={donationMessage || ""} onChange={(e) => setDonationMessage(e.target.value)} placeholder="Write a message"></textarea>
            </div>

            {
                submitError && (
                    <div className="donate-error"><p>{submitError}</p></div>
                )
            }

            {
                isSubmitting ? (
                    <button className="donation-button">One moment...</button>
                ) : (
                    <button className="donation-button" onClick={createDonation}>Donate</button>
                )
            }
            {/* <div className="donation-terms-show" onClick={() => setShowTerms( ! showTerms)}>Our privacy policy and terms</div>

            {
                showTerms && (
                    <DonationTerms />
                )
            } */}

        </div>
    )
}

export default function DonateBox(props) {
    return (
        <div className="donate-box">
            <style jsx>{styles}</style>

            <style global jsx>{`aside#donate-copy {
                color: #fff;
                padding: 2em!important;
            }
            #heading {
                margin:0;
                margin-bottom: 0.5em;
            }
            .amount-description.auto-member {
                font-size: 16px;
                line-height: 1.5rem;
                margin: 1em 0 2em 0;
            }
            `}</style>
            <header>
                <aside id="donate-copy">
                    {documentToReactComponents({ ...props.children, content: props.children.content.slice(1, 2) })}
                </aside>
                <section>
                    <h2 id="heading">Support our work</h2>
                    <div className="amount-description auto-member">
                        <p>When you donate 250 dkk or more, you automatically become a member of the HackYourFuture association for one year and you will be invited to the annual General Assembly</p>
                    </div>
                    <ResolveStripe>
                        <StripeDonation />
                    </ResolveStripe>
                </section>
            </header>
        </div>
    )
}