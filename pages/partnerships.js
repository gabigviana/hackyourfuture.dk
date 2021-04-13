import Head from 'next/head'
import styles from '../components/layouts/donate.scss'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { fetchPageContent } from '../contentful/contentful'
import DonateBox from '../components/donate/DonateBox'
import Partnerships from '../components/partnerships/Partnerships.js'
import CoverContent from '../components/layouts/cover-content/CoverContent'

export default ({ title, supportOurWork, becomeCompanyMember }) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <style global jsx>
        {`
          .donate li {
            font-size: 18px;
            list-style: inside;
          }
          .donate li p {
            display: inline-block;
          }
          #partnership-content > article {
            height: 40vh;
            padding: 4em;
          }
        `}
      </style>
      <style jsx>{styles}</style>
      <CoverContent id="partnership-content" background={"/static/images/donate_cover.jpg"}>
      <div>
        {documentToReactComponents({...becomeCompanyMember, content:becomeCompanyMember.content.slice(0,2)})}
        </div>
      </CoverContent>
      <Partnerships></Partnerships>
      
      {/* <div className='donate'>{documentToReactComponents(supportOurWork)}</div> */}
      {/* <div className='donate'>
        {documentToReactComponents(becomeCompanyMember)}
      </div> */}
  </Layout>
)

export async function getStaticProps() {
  const pageContent = await fetchPageContent('4euxs6laNQPt3UiRYfGI7T')

  return {
    props: {
      title: pageContent.title,
      supportOurWork: pageContent.supportOurWork,
      becomeCompanyMember: pageContent.becomeCompanyMember
    }
  }
}
