import { useEffect, useState, useRef } from 'react'
import styles from './DonationGoal.scss'

const currently = 123
const GOAL = 300

const fetchMembercount = () => fetch("/api/membercount").then((rsp) => rsp.json())

export default function DonationGoal(props) {
    const [memberCount, setMemberCount] = useState(0)
    const goalReached = Math.abs(parseInt(((memberCount)/GOAL) * 100))

    const ref = useRef();
    const onScreen = useOnScreen(ref);

    useEffect(() => {
        memberCount === 0 && fetchMembercount().then((rsp) => {
            const baseCount = rsp.count + currently
            for (let index = 1; index <= baseCount; index++) {
                setTimeout(() => {
                    setMemberCount(index)
                }, index * 30)
            }
        })
    }, [onScreen])
    return (
        <div className="donation-goal" ref={ref}>
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
                <div className="donation-indicator" style={{width:goalReached+"%"}}>{memberCount}</div>
                <h2>{GOAL} members</h2>
            </div>
        </div>
    )
}
// Hook
function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}