import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import CoverContent from '../components/layouts/cover-content/CoverContent'
import WufooForm from 'react-wufoo-embed'
import FAQ from '../components/faq/faq'
import ApplySection from '../components/apply-section/apply-section'
import Learning from '../components/learning-section/learning'
import ApplicationDeadline from '../components/apply-section/deadline/deadline'
import Curriculum from '../components/curriculum/curriculum'
import VolunteerIntro from '../components/cover-intro/VolunteerIntro'

import { fetchPageContent } from '../contentful/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import getEntryData from './../utils/utils'

import ApplyIntro from '../components/cover-intro/ApplyIntro'


export default ({
  applyChecks,
  title,
  content,
  pointingImage,
  whatYouWillLearn,
  getAHeadStart
}) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <style global jsx>{`
      #learning {
        background-color:#f3f3f3;}
      #final-apply > article {padding: 2em;}
      button.apply-now {
        background: #293a7d;
        color: #fff;
        padding: 0.75em;
        font-size: 1.25rem;
        border:none;
        font-family:"Space Mono";
      }
      #apply-cover > article {
        padding: 3em;
      }
      p > b {
      }
      #headstart > article {
        width: 50%;
      }
      #headstart > article {
        width: 50%;
      }
      #headstart > article > div > p > a,
      #headstart > article > div > h2 {
        color: #fff!important;
      }
      #headstart > article > div > p {
        max-width: 100%;
      }
      @media screen and (max-width: 768px) {
        #learning {
          padding: 1em!important;
          padding-top:0.1em!important;
        }
      }
    `}</style>
    <CoverContent id="apply-cover" background={"/static/images/apply_cover.jpg"}>
   
    <ApplySection
        applyChecks={applyChecks}
        content={content}
        pointingImage={pointingImage}
      >
      <Link href="/application"><button className="apply-now">Apply now</button></Link>
      </ApplySection>
   </CoverContent>
    <ApplicationDeadline />

    {/* <Content id='apply'>
      
    </Content> */}
    <Content id="learning">
      <Learning
        title={whatYouWillLearn.title}
        content={whatYouWillLearn.content}
        skills={whatYouWillLearn.skills}
      />
    </Content>
    {/* <Content id='apply-for-class'>
      <h2>Application Form</h2>
      <p>
        We are recruiting for the next class of HackYourFuture Copenhagen.
        We are right now updating our application process and we might need you
        to re-apply at a later point, but we will inform you about this and your
        application is registered once you have filled out this form.
      </p>
      <WufooForm
        userName='cphhackyourfuture'
        formHash='m1d0ru6z1qxggcq'
        header='hide'
      />
    </Content> */}

      {/* <Content inContextOf="apply">{documentToReactComponents(getAHeadStart)}</Content> */}
      <CoverContent id="headstart" background={"/static/images/hyf_volunteer.jpg"}>
      <div>{documentToReactComponents(getAHeadStart.getAHeadstart)}</div>
    </CoverContent>
    {/* <Content id='learn'>
      <div>{documentToReactComponents(getAHeadStart.getAHeadstart)}</div>
    </Content> */}
    {/* <Content> */}
    <VolunteerIntro inContextOf="faq">
      <FAQ />
    </VolunteerIntro>
      
    {/* </Content> */}
    <Curriculum />

    <CoverContent id="final-apply" background={"/static/images/apply_cover_1.jpg"}>
    <ApplySection
        applyChecks={applyChecks}
        heading="Apply now"
        // content={content}
        // pointingImage={pointingImage}
      >
      <Link href="/application"><button className="apply-now">Apply now</button></Link>
    </ApplySection>

    </CoverContent>
    <ApplicationDeadline />

 </Layout>
)

export async function getStaticProps() {
  const applyPage = await fetchPageContent('5w7Jg0xHnqQj45oYpDNIo2')
  // The reason we are also fetching this is because all the data is not published in the applyPage content
  const whatYouWillLearn = await fetchPageContent('7iahIUby68cDwoG6ytjKkD')

  const applychecksId = '7RI6Ik2yK1OblVP8csFdz'
  const applychecksData = getEntryData(applyPage, applychecksId)

  const pointingImageId = '6xuKqprt3T2bjoxYNYH8Ez'
  const pointingImage = getEntryData(applyPage, pointingImageId)

  const getAHeadStartId = '5ByqCkyQobvlXVvXM4bezP'
  const getAHeadStart = getEntryData(applyPage, getAHeadStartId)

  return {
    props: {
      applyChecks: applychecksData.fields.applyChecks,
      title: applyPage.headline,
      content: applyPage.mainBody,
      pointingImage: {
        src: pointingImage.fields.image.fields.file.url,
        alt: pointingImage.fields.image.fields.title
      },
      whatYouWillLearn: {
        title: whatYouWillLearn.title,
        content: whatYouWillLearn.content,
        skills: whatYouWillLearn.skills
      },
      getAHeadStart: getAHeadStart.fields
    }
  }
}
