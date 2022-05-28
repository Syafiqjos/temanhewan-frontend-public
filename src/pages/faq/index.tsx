import * as React from 'react';

import SEO from '@/components/Seo';

export default function FAQ() {
  return (
    <>
      <SEO title='FAQ' />

      <main>
        <section className='bg-primary-50 py-10 2xl:py-40'>
          <div className='container mx-auto px-4'>
            <div className='mb-20 text-center'>
              <h2 className='font-heading mt-8 text-7xl font-bold'>
                FAQ&apos;s
              </h2>
            </div>
            <div className='mx-auto max-w-4xl'>
              <div>
                <dl className='mx-auto mt-8 flex max-w-screen-sm flex-col lg:max-w-screen-lg lg:flex-row lg:flex-wrap'>
                  <div className='lg:w-1/2'>
                    <div className='question-and-answer group mx-8 my-3 cursor-pointer select-none rounded-lg border-2 bg-white px-6 py-4 text-sm'>
                      <dt className='question'>
                        <div className='flex justify-between'>
                          <div className='font-semibold text-primary-600'>
                            Check 123?
                          </div>
                          <div>
                            <svg
                              fill='none'
                              className='question-chevron block h-5 rounded-full bg-primary-400 p-1 text-primary-800 group-hover:bg-primary-500'
                              viewBox='0 0 20 20'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                              <g
                                stroke='currentColor'
                                strokeWidth='1'
                                fill='none'
                                fillRule='evenodd'
                              >
                                <g>
                                  <polygon points='9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8'></polygon>
                                </g>
                              </g>
                            </svg>
                            <svg
                              fill='none'
                              className='question-chevron hidden h-5 rounded-full bg-primary-400 p-1 text-primary-800 group-hover:bg-primary-500'
                              viewBox='0 0 20 20'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                              <g
                                stroke='currentColor'
                                strokeWidth='1'
                                fill='none'
                                fillRule='evenodd'
                              >
                                <g>
                                  <polygon points='10.7071068 7.05025253 10 6.34314575 4.34314575 12 5.75735931 13.4142136 10 9.17157288 14.2426407 13.4142136 15.6568542 12'></polygon>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </dt>
                      <dd className='answer mt-2 hidden leading-snug text-primary-700'>
                        Test123
                      </dd>
                    </div>
                  </div>
                  <div className='lg:w-1/2'>
                    <div className='question-and-answer group mx-8 my-3 cursor-pointer select-none rounded-lg border-2 bg-white px-6 py-4 text-sm'>
                      <dt className='question'>
                        <div className='flex justify-between'>
                          <div className='font-semibold text-primary-600'>
                            Check123
                          </div>
                          <div>
                            <svg
                              fill='none'
                              className='question-chevron block h-5 rounded-full bg-primary-400 p-1 text-primary-800 group-hover:bg-primary-500'
                              viewBox='0 0 20 20'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                              <g
                                stroke='currentColor'
                                strokeWidth='1'
                                fill='none'
                                fillRule='evenodd'
                              >
                                <g>
                                  <polygon points='9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8'></polygon>
                                </g>
                              </g>
                            </svg>
                            <svg
                              fill='none'
                              className='question-chevron hidden h-5 rounded-full bg-primary-400 p-1 text-primary-800 group-hover:bg-primary-500'
                              viewBox='0 0 20 20'
                              version='1.1'
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                            >
                              <g
                                stroke='currentColor'
                                strokeWidth='1'
                                fill='none'
                                fillRule='evenodd'
                              >
                                <g>
                                  <polygon points='10.7071068 7.05025253 10 6.34314575 4.34314575 12 5.75735931 13.4142136 10 9.17157288 14.2426407 13.4142136 15.6568542 12'></polygon>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </dt>
                      <dd className='answer mt-2 hidden leading-snug text-primary-700'>
                        Test123
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
