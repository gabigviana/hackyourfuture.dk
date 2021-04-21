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
            margin: 4em auto 2em auto;
            background-size: contain;
            background-color: #F2F2F2;
          }
          .private-membership-icon {
            border-radius: 20px;
            width: 25%;
            height: auto;
            margin: -2em 0 0 -2em;
            vertical-align: top;
          }
          #association-member > article {
            padding: 2em;
            box-sizing: border-box;
            margin: 0;
            background: none;
            display: inline-block;
            max-width:75%;
          }
          #association-member > article > h3 {
            margin-bottom: 1em;
            font-size: 1.75rem;
            line-height: 2.25rem;
          }

          // @media screen and (min-width: 769px) and (max-width: 1099px) {
          //   #association-member {
          //     max-width: 100%;
          //   padding: 8em 0 8em 0;
          //   }
          // }
          // @media screen and (min-width: 1100px) and (max-width: 1350px) {
          //   #association-member {
          //     max-width: 80%;
          //   }
          // }
          @media screen and (max-width: 768px) {
            #association-member {
              max-width: 100%;
              background-size: 220%;
              background-position: center center;
              margin: 2em 0;
              // padding: 9em 3em;
              box-shadow: none;
            }
            #association-member > article {
              transform: scale(1);
            }
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

      <div id="association-member">
        {/* <div className="association-member-icon"> */}
          {/* <img src="/static/logo-white.svg" className="private-membership-overlay-logo" /> */}
          <img src="/static/images/private_memberships.png" className="private-membership-icon" />
        {/* </div> */}
      <article>
      {documentToReactComponents({...supportOurWork, content:supportOurWork.content.slice(supportOurWork.content.length - 2,supportOurWork.content.length)})}
      </article>
      </div>

      {/* <CoverContent id="association-member" background={"/static/images/private_memberships.png"}> */}
     
      {/* <div>{documentToReactComponents(content)}</div> */}
      {/* </CoverContent> */}
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
