import styles from './DonationGoal.scss'

const currently = 23
const GOAL = 300

export default function DonationGoal(props) {
    const goalReached = Math.abs(parseInt(((currently)/GOAL) * 100))
    return (
        <div className="donation-goal">
            <style jsx>{styles}</style>
            {
                props.label
                ? (<h1>{props.label}</h1>)
                : (
                    <h1>Help us become a charitable association</h1>
                )
            }
            <p>Becoming an official charitable association would allow us easier access to municipal locations and enable us to offer tax breaks on donations under 16.300 kr.</p>
            <p className="small-text">We need to gather 300 one time donation of atleast 200 kr for the HyF Association</p>
            <div className="donation-bar">
                <div className="donation-indicator" style={{width:goalReached+"%"}}>{currently}</div>
                <h2>200 members</h2>
            </div>
        </div>
    )
}