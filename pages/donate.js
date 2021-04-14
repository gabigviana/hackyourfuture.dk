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
          @media screen and (max-width: 768px) {
            #association-member {
              max-width: 100%;
              margin: 2em auto;
            }
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
      
        <DonateBox>
        {supportOurWork}
        </DonateBox>

      </div>
      </section>

      <DonationGoal />

      <CoverContent id="association-member" background={"/static/images/donate_assoc_cover.jpg"}>
      <div>
      {documentToReactComponents({...supportOurWork, content:supportOurWork.content.slice(supportOurWork.content.length - 3,supportOurWork.content.length)})}
      </div>
      {/* <div>{documentToReactComponents(content)}</div> */}
      </CoverContent>
      {/* <SplashQuote link="/partnerships" heading={"Become a Company Partner of HackYourFuture!"} content={"Does your company want to support diversity and inclusion in the tech industry? Would you want to get access to a unique pool of talented tech professionals now or in the future?"} /> */}

      <Partnerships>{becomeCompanyMember}</Partnerships>
      
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
