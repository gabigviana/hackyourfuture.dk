import React from 'react'
import members from './team.json'
import ItemCard from './item-card/item-card'
import styles from './team.scss'
import alumniList from '../hire/alumni.json'
import HozSlider, {ResponsiveHozSlider} from '../hoz-slider/HozSlider'
//styling

function WrapHozSlider(props) {
  return (
    <>
    <style jsx>{styles}</style>
      <style global jsx>{`
      .hoz-slider-container > section > div.hoz-slider-slides {
        text-align: left;
      }
        .hoz-slider-container > section > div.hoz-slider-slides > article {
          opacity:1!important;
        }
        // @media screen and (max-width: 768px) {
        //   .hoz-slider-container > section > div.hoz-slider-slides > article {
        //     min-width:4%;
        //   }
        // }
      `}</style>
      <ResponsiveHozSlider><HozSlider
        heading={props.heading}
        elementPercentageWidth={22}
        mobileElementPercentageWidth={50}
        offsetMultiplier={4.5}
        offsetDefault={0}
        renderElement={(element) => (
          <ItemCard item={element} key={element.id} showHiredOverlay={false} />
        )}
        entries={props.entries}
          /></ResponsiveHozSlider>
      </>
  )
}

export const CoreTeam = () => {
  const coreTeam = members.filter(member => member.roles.includes('core'))
  return (
    <>
      <style jsx>{styles}</style>
      <h2 className='title'>Core team</h2>
      <div className='team-members core-team'>
        {coreTeam.map(member => (
          <ItemCard item={member} key={member.id} showHiredOverlay={false} />
        ))}
      </div>
    </>
  )
}

export const BoardMembers = () => {
  const boardMembers = members.filter(member =>
    member.roles.includes('boardmember')
  )
  return (
    <>
      <style jsx>{styles}</style>
      <h2 className='title'>Board members</h2>
      <div className='team-members core-team'>
        {boardMembers.map(boardMember => (
          <ItemCard
            item={boardMember}
            key={boardMember.id}
            showHiredOverlay={false}
          />
        ))}
      </div>
    </>
  )
}

export const MentorsTeam = () => {
  const mentors = members.filter(member => member.roles.includes('mentor')).sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <style jsx>{styles}</style>
      {/* <h1 className='title'>Our Mentors</h1> */}
      <div className='team-members mentors'>
        <WrapHozSlider heading="Meet our Mentors" entries={mentors} />
      </div>
    </>
  )
  return (
    <>
      <style jsx>{styles}</style>
      <style global jsx>{`
        .hoz-slider-container > section > div.hoz-slider-slides > article {
          opacity:1!important;
        }
      `}</style>
      <h2 className='title'>Our Mentors</h2>
      <div className='team-members mentors'>
      
      <HozSlider
        elementPercentageWidth={20}
        renderElement={(element) => (
          <ItemCard item={element} key={element.id} showHiredOverlay={false} />
        )}
        entries={mentors.sort((a, b) => a.name.localeCompare(b.name))}
          />

        {/* {mentors
          .sort((a, b) => a.name.localeCompare(b.name)) // sort names alphabetically
          .map(member => (
            <ItemCard item={member} key={member.id} showHiredOverlay={false} />
          ))} */}
      </div>
    </>
  )
}

export const Graduates = () => {
  const highlightedAlumniInCompany = alumniList.filter((alumni) => alumni.company).sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <style jsx>{styles}</style>
      {/* <h1 className='title'>Meet our Graduates</h1> */}
      <div className='team-members employed-alumni'>
      <WrapHozSlider heading="Meet our Graduates" entries={highlightedAlumniInCompany} />
        
      </div>
    </>
  )
}

export default () => {
  return (
    <div>
      <BoardMembers />
      <CoreTeam />
      <MentorsTeam />
      <Graduates />
    </div>
  )
}
