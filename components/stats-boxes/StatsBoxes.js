import styles from './StatsBoxes.scss'

const mockStats = [
  {
    label:"Classes",
    value:"18"
  },
  {
    label:"Students",
    value:"270"
  },
  {
    label:"Mentors",
    value:"150"
  },
  {
    label:"Employment",
    value:"100"
  },
]

export default function StatsBoxes(props) {
    return (
      <div className="stats-boxes-container">
          <style jsx>{styles}</style>
       
          {mockStats.map((stat, i) => (
            <div key={i}>
              <h1>{stat.value}</h1>
              <h2>{stat.label}</h2>
            </div>
          ))}

      </div>
    )
  }