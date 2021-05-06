import Head from 'next/head'
import styles from '../components/layouts/donate.scss'
import Layout from '../components/layouts/layout'
import Content from '../components/layouts/content/content'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { fetchPageContent } from '../contentful/contentful'
import DonateBox from '../components/donate/DonateBox'
import DonationGoal from '../components/donate/DonationGoal'
import CoverContent from '../components/layouts/cover-content/CoverContent'
import SplashQuote from '../components/layouts/content/SplashQuote'
import Partnerships from '../components/partnerships/Partnerships'
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
          #association-member {
            max-width: 80%;
            margin: 2em auto;
          }
          #association-member > article {
            padding: 3em;
          }
          #association-member > article > div > h3 {
            margin-bottom: 1em;
            font-size: 1.75rem;
            line-height: 2rem;
          }
        `}
      </style>
      <style jsx>{styles}</style>
      <section className="donate-header">
        <div className="donate-cover">
      
        <article>
        </article>

      </div>
      </section>

      <DonationGoal label={"👍 Thank you for helping us become a chertiable association"} description={false} />

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
