/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */

/**
 * Custom Document component for the Next.js application.
 * This file is used to augment the application's <html> and <body> tags.
 * It is used to inject Material-UI styles for server-side rendering (SSR)
 * to ensure consistent styling between server and client.
 *
 * Key Components:
 * - Document: The base class from Next.js to extend for custom document rendering.
 * - Html: A Next.js component to define the <html> element.
 * - Head: A Next.js component to define the <head> element, where meta tags, links,
 *      and other head elements are placed.
 * - Main: A Next.js component that renders the application's main content.
 * - NextScript: A Next.js component that includes the necessary Next.js scripts.
 * - ServerStyleSheets: A Material-UI component to collect and inject styles for SSR.
 *
 * The getInitialProps method is overridden to collect Material-UI styles on the server
 * side and inject them into the HTML.
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '@/theme';
import createEmotionCache from '@/createEmotionCache';
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href="/favicon.ico" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;
