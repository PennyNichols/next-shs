/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */

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
import Document, { Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import Head from 'next/head';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
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
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default MyDocument;
