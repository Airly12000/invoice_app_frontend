import React from 'react';
import NotFoundImage from '../assets/images/illustration-page-not-found.svg';

function NotFound() {
	return (
		<main className='col row overflow-auto mt-lg-4 mb-3'>
			<div className='d-flex flex-column justify-content-center align-items-center pt-2'>
				<img
					src={NotFoundImage}
					id='NotFound'
					alt='NotFound'
					className='mb-3'
				/>
				<div className='d-flex flex-column col-black text-center align-items-center justify-content-center'>
					<h3 className='col-purple f-w' style={{ fontSize: 50 + 'px' }}>
						404!
					</h3>
					<h3 className='f-w'>Oops! You weren't supposed</h3>
					<h3 className='f-w'>to see this</h3>
					<p className='fs-12 w-60'>
						It looks like you've reached a URL that doesn't exist. Please use
						the button below to find your way back to our website.
					</p>
				</div>
				<a href='/' style={{ textDecoration: 'none' }}>
					<button className='rounded-pill newB d-flex flex-row align-items-center justify-content-center'>
						<span className='fs-16 f-w px-2'>Back to Home</span>
					</button>
				</a>
			</div>
		</main>
	);
}

export default NotFound;
