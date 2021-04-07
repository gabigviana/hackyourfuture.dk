import Head from 'next/head'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import Contactform, {ContactformContainer} from '../components/contact-form/contact-form'
import { BoardMembers, CoreTeam } from '../components/team/team'
import Partners from '../components/partners/partners'
import Supporters from '../components/supporters/supporters'
import Sponsors from '../components/sponsors/sponsors'
import Press from '../components/press/press'
import Values from '../components/values/values'
import LGReport from '../components/lg-report/lg-report'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { fetchPageContent } from '../contentful/contentful'
import getEntryData from './../utils/utils'
import CoverIntro from '../components/cover-intro/CoverIntro'
import StatsBoxes from '../components/stats-boxes/StatsBoxes'
import InternationalPartners from '../components/partners/internationalPartners'
import MissionVision from '../components/layouts/mission-vision/MissionVision'
import SplashQuote from '../components/layouts/content/SplashQuote'
import SponsorSplit from '../components/layouts/sponsor-split'
export default ({
  content,
  title,
  contactTitle,
  contactBody,
  missionTitle,
  missionContent,
  visionTitle,
  visionContent
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <CoverIntro />

      <StatsBoxes />



      <MissionVision />
      <Values />

      {/* <Content inContextOf="about">
        <div>{documentToReactComponents(content)}</div>
      </Content> */}

      <ContactformContainer>
        <Contactform email={'cph@hackyourfuture.dk'} />
      </ContactformContainer>
      <Press />

      {/* <Content inContextOf="contact" id='contact'>
        <h2>{contactTitle}</h2>
        <div>{documentToReactComponents(contactBody)}</div>
        <Contactform email={'cph@hackyourfuture.dk'} />
        <div style={{ marginTop: 40 }}>
          <Map />
        </div>
      </Content> */}

      

      <BoardMembers />
      <CoreTeam />
      
      <SponsorSplit>
        <Sponsors />
        <Partners />
      </SponsorSplit>

      <SplashQuote heading={"Become a Company Partner of HackYourFuture!"} content={"Does your company want to support diversity and inclusion in the tech industry? Would you want to get access to a unique pool of talented tech professionals now or in the future?"} />

      <Supporters />
      <InternationalPartners />

      
      <LGReport />
    </Layout>
  )
}

export async function getStaticProps() {
  const pageContent = await fetchPageContent('3VD8j3TGv3H66fVLrHGWuC')

  // const contactContentId = '57BmNlPMn5pBZBBvPNIoLC'
  // const contactContent = getEntryData(pageContent, contactContentId)

  // const missionId = '78n7xxaJslhhZgyfenKIfY'
  // const mission = getEntryData(pageContent, missionId)

  // const visionId = '2fFr5cVrIsqSHp3Y5s0qkz'
  // const vision = getEntryData(pageContent, visionId)

  return {
    props: {
      title: pageContent.headline,
      content: pageContent.mainBody,
      // contactTitle: contactContent.fields.title,
      // contactBody: contactContent.fields.bodyText,
      // missionTitle: mission.fields.title,
      // missionContent: mission.fields.content,
      // visionTitle: vision.fields.title,
      // visionContent: vision.fields.content
    }
  }
}
