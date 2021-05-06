import Head from 'next/head'
import {useEffect} from 'react'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import Hero from '../components/hero/hero'
import VideoHighlight from '../components/video-highlight/video-highlight'
import FindUs from '../components/find-us/find-us'
import Partners from '../components/partners/partners'
import { Graduates } from '../components/team/team'
import { fetchPageContent } from '../contentful/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import getEntryData from './../utils/utils'
import SplashQuote from '../components/layouts/content/SplashQuote'
import Classes from '../components/classes/Classes'
import Testimonials from '../components/testimonials/Testimonials'
import ThreePictureCard from '../components/layouts/content/ThreePictureCard'
import SponsorSplit from '../components/layouts/sponsor-split'
import Sponsors from '../components/sponsors/sponsors'

export default ({ title, content, successStories }) => {
  return (
    <Layout>
      <Head>
        <meta
          name='google-site-verification'
          content='YvWW5A5Yye9vDijg-oTcYoggq9HkweFT-6J9d6xjnNA'
        />
        <title>{title}</title>
      </Head>
      <Hero />
      <ThreePictureCard contentBoxesId={"2LWO5HsnPh6I2infa9AvvR"} />
      {/* <Content inContextOf="frontpage">{documentToReactComponents(content)}</Content> */}
      <SplashQuote />
      <Classes />
      <div style={{height:"4em"}} />
      <Graduates />
      <Testimonials />
      {/* <img src="/static/images/hyf-banner.png" /> */}
      {/* <Partners /> */}

      <SponsorSplit>
        <Sponsors />
        <Partners />
      </SponsorSplit>

      <VideoHighlight
        title={successStories.title}
        content={successStories.content}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const pageContent = await fetchPageContent('7FxhqeZITqO5lhHwvzAu47')

  const successStoriesId = '40NNt3OuP7s2tPGTg50BF5'
  const successStories = getEntryData(pageContent, successStoriesId)
  return {
    props: {
      title: pageContent.headline,
      content: pageContent.mainBody,
      successStories: {
        title: successStories.fields.title,
        content: successStories.fields.content
      }
    }
  }
}
