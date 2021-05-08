import Head from 'next/head'
import Layout from '../components/layouts/layout'
import Hire from '../components/hire/Hire'
import styles from './../components/hire/hire.scss'
import { fetchPageContent } from '../contentful/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Contactform, {ContactformContainer} from '../components/contact-form/contact-form'
import Testimonials from '../components/testimonials/Testimonials'

export default ({ content, title }) => (
  <Layout>
    
    <Head>
      <title>{title}</title>
    </Head>

    <section className='hire-container'>
      <style jsx>{styles}</style>
      <div className="hire-cover"></div>
      <div className="hire-header">
      <div className="hire-header-content">{documentToReactComponents(content)}</div>
      <Hire />
      <div style={{height:"2em"}}></div>
      <Testimonials />
      <ContactformContainer>
        <Contactform email={'cph@hackyourfuture.dk'} />
      </ContactformContainer>
      </div>
    </section>
  </Layout>
)

export async function getStaticProps() {
  const pageContent = await fetchPageContent('72JSbjgf1uRWTMx25xYUnD')

  return {
    props: {
      title: pageContent.headline,
      content: pageContent.mainBody
    }
  }
}
