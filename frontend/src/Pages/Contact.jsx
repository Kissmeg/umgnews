import React from 'react'

const Contact = () => {
  return (
    <div className='pt-32' id='contact'>
      <div className='ml-4'>
        <p className='font-bold text-4xl'>Contact UMGNews</p>
        <div className='ml-4 mt-12'>
          <div>
            <p className='font-semibold'>General Inquiries</p>
            <p className='ml-4 w-1/2 mt-2'>For general questions, feedback, or partnership opportunities, please email us at <a href='mailto:info@umgnews.com' className='text-blue-500'>info@umgnews.com</a>.</p>
          </div>
          <div className='mt-6'>
            <p className='font-semibold'>Advertising & Business</p>
            <p className='ml-4 w-1/2 mt-2'>Interested in advertising with UMGNews? Reach out to our marketing team at <a href='mailto:ads@umgnews.com' className='text-blue-500'>ads@umgnews.com</a>.</p>
          </div>
          <div className='mt-6'>
            <p className='font-semibold'>Technical Support</p>
            <p className='ml-4 w-1/2 mt-2'>Having issues with the website? Let our support team help you at <a href='mailto:support@umgnews.com' className='text-blue-500'>support@umgnews.com</a>.</p>
          </div>
          <div className='mt-6 mb-12'>
            <p className='font-semibold'>Social Media</p>
            <p className='ml-4 w-1/2 mt-2'>Stay connected with us on social media:</p>
            <ul className='ml-8 mt-2 list-disc'>
              <li><a href='https://instagram.com/umgnews.usa' target='_blank' rel='noopener noreferrer' className='text-blue-500'>Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
