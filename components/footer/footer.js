import SocialIcons from './social-icons/social-icon'

// import material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MULink from '@material-ui/core/Link'
import Link from 'next/link'
// Styling
const useStyles = makeStyles(theme => ({
  callToAction:{
    backgroundColor:"#fff",
    padding: "10px",
    marginTop:"3em"
  },
  callToActionContainer: {
    backgroundColor:"#efefef",
    margin: "10px",
    padding: "20px",
    minHeight: "215px",
    '@media (max-width:780px)':{
      minHeight:"initial",
      marginBottom:"2em"
    },
    '@media (min-width:1100px)':{
      minHeight: "160px",
    }
  },
  callToActionLabel: {
      color: "#fff",
      margin: "0 0 20px 0",
      display: "block",
      padding: "0 10px",
      fontWeight: 300,
      background: "#293a7d",
      marginTop: "-2.8em",
      fontSize: "1rem",
      width: "11em",
      textAlign: "center",
      cursor:"pointer"
    // margin: "0 0 20px 0",
    // border: "1px solid #ccc",
    // display: "inline-block",
    // padding: "0 10px",
    // fontWeight: 300,
    // color: "#666",
  },
  callToActionDescription: {
    fontSize: "1rem",
    fontFamily: '"Space Mono", monospace',
    lineHeight: "1.5rem",
  },
  footer: {
    backgroundColor: '#293a7d',
    paddingTop: '5px'
  },
  info: {
    fontSize: '0.8rem',
    color: '#fff',
    margin: '0.5rem 0.4rem'
  },
  link: {
    color: '#fff'
  }
}))

const mockCallToAction = [
  {
    label:"Donate",
    url:"/donate",
    description:"HackYourFuture is a non-profit organization and our course is entirely free for the students. Become a supporting member of the HackYourFuture association"
  },
  {
    label:"Volunteer",
    url:"/volunteer",
    description:"Our teachers and mentors are professional web-developers with a passion for technology and a wish to share their knowledge with our students"
  },
  {
    label:"Partnership",
    url:"/donate#partnerships",
    description:"Does your company want to support diversity and inclusion in the tech industry? Consider becoming a partner and find out more here."
  },
]

export default () => {
  const classes = useStyles()
  return (
    <>
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='baseline'
      className={classes.callToAction}
    >
      {mockCallToAction.map((cta,i) => (
        <Grid item lg={4} md={4} sm={12}>
          <div className={classes.callToActionContainer}>
            <Link href={cta.url}><h2 className={classes.callToActionLabel}>{cta.label}</h2></Link>
            <p className={classes.callToActionDescription}>{cta.description}</p>
          </div>
        </Grid>
      ))}
    </Grid>
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      className={classes.footer}
    >

      <Grid item lg={8} md={7} sm={12}>
        <Typography align='left' className={classes.info}>
          Foreningen HackYourFuture | CVR: 38533193 |{' '}
          <MULink
            className={classes.link}
            rel='noopener'
            href='mailto:cph@hackyourfuture.dk'
            style={{ wordBreak: 'break-word' }}
          >
            cph@hackyourfuture.dk
          </MULink>
        </Typography>
      </Grid>
      <Grid item lg={4} md={5} sm={12}>
        <SocialIcons />
      </Grid>
    </Grid>
    </>
  )
}
