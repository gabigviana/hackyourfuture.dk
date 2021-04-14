import styles from './DonationGoal.scss'

const currently = 23
const GOAL = 200

export default function DonationGoal(props) {
    const goalReached = Math.abs(parseInt(((currently)/GOAL) * 100))
    console.log(goalReached)
    return (
        <div className="donation-goal">
            <style jsx>{styles}</style>
            <h1>Help us become a charitable association</h1>
            <p>We need to gather 200 one time donation of atleast 200 kr for the HyF Association</p>
            <div className="donation-bar">
                <div className="donation-indicator" style={{width:goalReached+"%"}}>{currently}</div>
                <h2>200 members</h2>
            </div>
        </div>
    )
}