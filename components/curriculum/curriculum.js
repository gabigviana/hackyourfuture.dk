import styles from './curriculum.scss'
import React, { useEffect, useState, useRef } from 'react'
import {useRouter} from 'next/router'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import Markdown from 'react-markdown'
const gfm = require('remark-gfm')

// 'https://api.github.com/repos/HackYourFuture-CPH/HTML-CSS/contents/readme.md'
// function ShowGitRepo(props) {
//   const [repo, setRepo] = useState(false)
//   useEffect(() => {
//     fetch(props.gitReadme)
//         .then(function(response) {
//             return response.json();
//         }).then(function(data) {
//           setRepo(atob(data['content']))
//         });
//   },[props.gitReadme])
//   if (repo) {
//     return (
//       <>
//       <Markdown remarkPlugins={[gfm]}>{repo}</Markdown>
//       </>
//     )
//   }
//   return null
// }
function redirect_blank(url) {
  var a = document.createElement('a');
  a.target="_blank";
  a.href=url;
  a.click();
}

const Curriculum = () => {
  const curriculumEntryId = '5iMQfQkm1sJoBdiBZArNLE'
  const ref = useRef()
  const { content: modules } = useContentfulEntryId(curriculumEntryId)
  const [showModule, setShowModule] = useState(false)
  const [nextModule, setNextModule] = useState(false)
  const doShowModule = (classModule, i) => {
    setShowModule(classModule.gitReadme)
    modules.curriculum[i + 1] && setNextModule(modules.curriculum[i + 1])
    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    }, 250)
  }
  return (
    <>
    <div className='curriculum'>
      <style jsx>{styles}</style>
    <h2>Our curriculum</h2>
      {modules && (
        <ul>
          {modules.curriculum.map((classModule,i) => (
            <li key={classModule.id} onClick={() => redirect_blank(classModule.gitUrl)}>
              <h2>{i + 1}</h2>
              <h3>{classModule.title}</h3>
              <h4>{classModule.duration}</h4>
            </li>
          ))}
        </ul>
      )}
      <div ref={ref} style={{height:"30px"}}></div>
    <div className="modal" >
      {
        showModule && (
      <div>
        {/* <ShowGitRepo gitReadme={showModule} /> */}
        {
          nextModule && (
            <div className="next-module" onClick={() => doShowModule(nextModule, modules.curriculum.findIndex((m) => m.id === nextModule.id))}>
              <h4>Next module</h4>
              <h3>{nextModule.title}</h3>
            </div>
          )
        }
      </div>
        )
      }
    </div>
    </div>
    </>
  )
}

export default Curriculum
