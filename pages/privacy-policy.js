import Head from 'next/head'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import { fetchPageContent } from '../contentful/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import getEntryData from './../utils/utils'

export default ({ title, content, successStories }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div style={{height:"5em"}}></div>
      <div style={{maxWidth:"80%",margin:"0 auto"}}>
      <Content>
          <h1>{title}</h1>
          {documentToReactComponents(content)}
        </Content>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const pageContent = await fetchPageContent('2Ai5kEf0DXTFVFiB6ktKD4')

  return {
    props: {
      title: pageContent.headline,
      content: pageContent.mainBody,
    }
  }
}
