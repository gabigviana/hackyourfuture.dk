import Head from 'next/head'
import Layout from '../components/layouts/layout'
import styles from './../components/layouts/volunteer.scss'
import Content from '../components/layouts/content/content'
import Contactform from '../components/contact-form/contact-form'
import { MentorsTeam } from '../components/team/team'
import Partners from '../components/partners/partners'
import Curriculum from '../components/curriculum/curriculum'
import FAQ from '../components/faq/faq-mentors'
import { fetchPageContent } from '../contentful/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import VolunteerIntro from '../components/cover-intro/VolunteerIntro'

export default ({ content, title }) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <div>
    <style jsx>{styles}</style>

      <VolunteerIntro>
      <h3 id='becoming-mentor'>Would you like to help?</h3>
      <Contactform email={'cph@hackyourfuture.dk'} />
      </VolunteerIntro>
      <Content inContextOf="volunteer">{documentToReactComponents(content)}</Content>
      {/* <div>{documentToReactComponents(content)}</div> */}
      <Curriculum />

      
    </div>

    <VolunteerIntro inContextOf="faq">
      <FAQ />
    </VolunteerIntro>

    <MentorsTeam id='mentors' />

    <Partners />
  </Layout>
)
export async function getStaticProps() {
  const pageContent = await fetchPageContent('b0oU6EiiaMIBJEFHKw2yr')

  return {
    props: {
      title: pageContent.headline,
      content: pageContent.mainBody
    }
  }
}
