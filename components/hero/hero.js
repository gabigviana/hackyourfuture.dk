import styles from './hero.scss'
import Flip from 'react-reveal/Flip'
const Hero = () => (
  <div className='container hero-container'>
    <style jsx>{styles}</style>

    {/* <Flip top>
    </Flip> */}
    <h1>Helping new talent into the tech world</h1>
    <section className="hero-copy-container">
      <div>
        <h3>HackYourFuture supports refugees, asylum seekers and disadvantaged groups with limited access to further education and the Danish labour market in acquiring the necessary skills to become web developers and entering a very in-demand field.</h3>
      </div>
    </section>
  </div>
)

export default Hero
