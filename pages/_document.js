// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import styles from './document.scss'


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage



    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>
      ]
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument