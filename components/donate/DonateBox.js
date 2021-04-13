import {useEffect, useState} from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from './DonateBox.scss'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';



const suggestions = [250,500,1000]

function createStripeDonation(stripe, donationDetails) {
    console.log(Stripe)
    return fetch("/api/donate", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(donationDetails)
    }).then((rsp) => rsp.json()).then((rsp) => {
        return stripe.redirectToCheckout({ sessionId: rsp.id });
    })
}

function ResolveStripe(props) {
    const [stripeSession, setSession] = useState(true)
    useEffect(() => {
       loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY).then((s) => setSession(s))
    },[])
    console.log(loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY).then((s) => console.log(s)))
    if ( ! stripeSession) return null
    if (stripeSession) {
        return React.cloneElement(props.children, {...props, stripe:stripeSession})
    }
}

function StripeDonation(props) {
    const [donationType, setDonationType] = useState(false)
    const [donationAmount, setDonationAmount] = useState(false)
    const [donationMessage, setDonationMessage] = useState(false)
    return (
        <div className="stripe-donation">
            <style jsx>{styles}</style>

            <form className="donation-type">
            <div>
                <input type="radio" name="donation-type" value="one-time" onClick={() => setDonationType("one-time")} />
                <label>One time</label>
            </div>
            <div>
                <input type="radio" name="donation-type" value="monthly" onClick={() => setDonationType("monthly")} />
                <label> Monthly</label>
            </div>
            </form>
            
            <ul className="donation-amount">
                {suggestions.map((amount, i) => (
                    <li key={i} onClick={() => setDonationAmount(amount)}><label>{amount} dkk</label></li>
                ))}
            <li className="input-amount">
                <input type="number" onChange={(e) => setDonationAmount(e.target.value)} placeholder="Other amount" name="donation-type" value={donationAmount || ""} />
            </li>
            </ul>
        
            <div className="donation-message">
                <label>Message</label>
                <textarea value={donationMessage || ""} onChange={(e) => setDonationMessage(e.target.value)} placeholder="Write a message"></textarea>
            </div>

            <button onClick={() => createStripeDonation(props.stripe,{
                type:donationType,
                amount: donationAmount,
                message:donationMessage
            })}>Donate</button>
        
        </div>
    )
}

export default function DonateBox(props) {
    return (
        <div className="donate-box">
            <style jsx>{styles}</style>

            <style global jsx>{`.donate-box > aside > * {
                color: #fff;
            }`}</style>
            <header>
            <aside>
                {documentToReactComponents({...props.children, content:props.children.content.slice(0,2)})}
            </aside>
            <section>
                <ResolveStripe>
                <StripeDonation />
                </ResolveStripe>
            </section>
            </header>
        </div>
    )
}