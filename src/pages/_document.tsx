import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { RTL_LANGUAGES } from '@/lib/constants';

function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = getDirection(locale);
    return (
      <Html>
        <Head>
          {/*  Google Tag Manager
            src="https://www.googletagmanager.com/gtag/js?id=G-QT8H01JMZV"NEXT_PUBLIC_GOOGLE_ANALYTICS
            */}
          <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QT8H01JMZV" />
          <script
          dangerouslySetInnerHTML={{
             __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QT8H01JMZV', {
                    page_path: window.location.pathname,
                    });
            `,
          }}
          />
          {/*  End Google Tag Manage */}
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
