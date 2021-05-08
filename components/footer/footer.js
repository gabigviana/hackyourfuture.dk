import SocialIcons from './social-icons/social-icon'

// import material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MULink from '@material-ui/core/Link'
import Link from 'next/link'
import { useContentfulEntryId } from '../../contentful/contentful-hooks'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// Styling
const useStyles = makeStyles(theme => ({
  callToAction:{
    backgroundColor:"#f3f3f3",
    padding: "10px",
    marginTop:"3em"
  },
  callToActionContainer: {
    backgroundColor:"#fff",
    margin: "10px",
    padding: "0.5em 1em",
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
      marginTop: "-3em",
      fontSize: "1rem",
      width: "11em",
      textAlign: "center",
      cursor:"pointer",
      '@media (max-width:780px)':{
        marginTop:"-1em",
        transform:"scale(1.1)"
      },
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
    padding: '1em'
  },
  info: {
    fontSize: '0.8rem',
    color: '#fff',
    margin: '0.5rem 0.4rem',
    fontFamily: '"Space Mono", monospace',
  },
  link: {
    color: '#fff'
  }
}))

const footerContentfulId = "668uX6oSTZYb4y4ZBStavy"

export default () => {
  const classes = useStyles()
  const footer = useContentfulEntryId(footerContentfulId).content
  const callToActionBoxes = footer && footer.callToActionBoxes
  return (
    <>
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='baseline'
      className={classes.callToAction}
    >
      {callToActionBoxes && callToActionBoxes.map((cta,i) => (
        <Grid item lg={4} md={4} sm={12} key={i}>
          <div className={classes.callToActionContainer}>
            <Link href={cta.fields.link}><h2 className={classes.callToActionLabel}>{cta.fields.label}</h2></Link>
            <div className={classes.callToActionDescription}>{documentToReactComponents(cta.fields.description)}</div>
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
