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
import SplashQuote from '../components/layouts/content/SplashQuote'
export default ({ content, title }) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <div>
    <style jsx>{styles}</style>
    <style global jsx>{`
                header.curriculum-header {
                  text-align: center;
                  max-width: 66.66%;
                  margin: 2em auto;
                }
                header.curriculum-header > * {
                    width: 50%;
                    display: inline-block;
                    vertical-align: top;
                    text-align: left;
                    margin: 0;
                }
                header.curriculum-header > p {
                    margin-top: 2em;
                }
                @media screen and (max-width: 768px) {
                    header.curriculum-header {
                        padding: 2em;
                        margin-top: 0!important;
                    }
                    header.curriculum-header > * {
                        width: 100%;
                    }
                }
            `}</style>

      <VolunteerIntro>
      <h3 id='becoming-mentor'>Would you like to help?</h3>
      <Contactform email={'cph@hackyourfuture.dk'} />
      </VolunteerIntro>
      {/* <Content inContextOf="volunteer">{documentToReactComponents(content)}</Content> */}
      {/* <div>{documentToReactComponents(content)}</div> */}
      <SplashQuote content="There are different volunteering roles at HackYourFuture and we’re happy for every pair of extra hands supporting our community. You don’t need to know the entire technology stack we teach, but it’s important that you can contribute with concrete skills or actions that help our students land a job."></SplashQuote>
     
      <header className="curriculum-header">
      <h1>What do we teach?</h1>
      <p>We teach the fundamentals of full-stack web development, with a focus on modern Javascript. The program relies on lots of hands-on exercises as well as  project-based work. Check out our curriculum here.</p>
      </header>
     
     
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
