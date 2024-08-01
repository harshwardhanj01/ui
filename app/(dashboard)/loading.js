import React from 'react'
import Head from 'next/head';
import Image from 'next/image';

const loading = () => {
  return (
    <>
    <div className="flex justify-center items-center h-screen">
			<Head>
				<title>Loading...</title>
			</Head>
			<div className="animate-spin">
				<Image
					src="/images/Marketminds_Logo(1).png"
					alt="Loading Spinner"
					width={200}
					height={200}
				/>
			</div>
		</div>
    </>
  )
}

export default loading
