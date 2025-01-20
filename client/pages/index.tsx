import React from 'react'

import  Head  from 'next/head'

function home() {
  return (
    <> 
     <Head>
        <title>Home</title>
        <meta name="keywords" content="Home" />
        <meta name="description" content="Learn more about home page." />
      </Head>
    <div>  <h1>Welcome to the Home Page!</h1></div>
 
    </>
  )
}

export default home