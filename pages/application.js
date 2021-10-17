import Head from 'next/head'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import WufooForm from 'react-wufoo-embed'
import FAQ from '../components/faq/faq'
import ApplySection from '../components/apply-section/apply-section'
import Learning from '../components/learning-section/learning'
import ApplicationDeadline from '../components/apply-section/deadline/deadline'

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
    <Content id='apply-for-class'>
      <div style={{height:"50px"}}></div>
      <h2>Application Form</h2>
      <WufooForm
        userName='cphhackyourfuture'
        formHash='m956dho04idykw'
        header='hide'
      />
    </Content>
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
