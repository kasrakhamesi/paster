import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head>
        <meta name="theme-color" content="#C5FF4B" />
        <meta
          name="description"
          content="ASTERFI is a unique NFT collection that combines the value of cryptocurrency investments with the collectability of NFTs. With a limited edition of 2000 NFTs, ASTERFI is the first project of its kind to offer a cash flow stream for each NFT in the collection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-full antialiased transition-all duration-100 ease-in lg:overflow-auto scroll-smooth" >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
