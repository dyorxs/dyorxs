import Document, { Head, Html, Main, NextScript } from 'next/document'

const v = `?v=${process.env.TRACE_ID}`

export default class extends Document {
  render = () => (
    <Html lang='en' dir='ltr'>
      <Head>
        <link rel='preconnect' href={process.env.REACT_APP_NODE_1} />
        <link rel='preconnect' href={process.env.REACT_APP_HECO_NODE_1} />
        <link rel='preconnect' href={process.env.REACT_APP_ETHEREUM_NODE_1} />
        <link rel='preconnect' href={process.env.REACT_APP_MATIC_1} />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap' />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' />

        <link rel='shortcut icon' href={`/DyorAudit-favicon-32x32.png${v}`} />
        <link rel='apple-touch-icon' sizes='150x150' href={`/mstile-150x150.png${v}`} />
        <link rel='manifest' href={`/manifest.json${v}`} />

        <meta charSet='utf-8' />
        <meta
          name='description'
          content=' '
        />
        <meta name='theme-color' content='#fff' />
        <meta
          name='twitter:description'
          content=' .'
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content=' ' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
