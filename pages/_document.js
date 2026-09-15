import Document, { Html, Head, Main, NextScript } from "next/document";
import { VENDOR_CSS } from "../lib/vendorAssets";

class ASCOLPDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, isAdmin: ctx.pathname.startsWith("/admin") };
  }

  render() {
    const { isAdmin } = this.props;

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon.ico" />
          {!isAdmin ? (
            <>
              <link rel="manifest" href="/assets/images/favicons/site.webmanifest" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
                rel="stylesheet"
              />
              {VENDOR_CSS.map((href) => (
                <link key={href} rel="stylesheet" href={href} />
              ))}
              <link rel="stylesheet" href="/assets/css/redesign.css" />
            </>
          ) : null}
        </Head>
        <body>
          <Main />

          {!isAdmin ? (
            <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
              <i className="fa fa-angle-up"></i>
            </a>
          ) : null}

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ASCOLPDocument;
