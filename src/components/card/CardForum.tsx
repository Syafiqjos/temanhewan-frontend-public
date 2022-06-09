import * as React from 'react';

import UnstyledLink from '../links/UnstyledLink';


export default function CardForum(props: any) {

  return (
    <>
      <div className="px-3 py-5">
        <UnstyledLink href={props.slug}>
            <div className="rounded overflow-hidden shadow-lg hover:bg-primary-50">
              {props.avatar != 'none' ?
                <div className="flex items-center space-x-4 px-6 py-4">
                  <img className="w-10 h-10 rounded-full" src={props.avatar} alt="avatar" /> 
                  
                  <div className="space-y-1 font-medium dark:text-white">
                      <div>{props.author}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{props.date}</div>
                  </div>
                </div>
              : ''}
              <div>
                <img className="object-cover w-full h-56 object-top" src={props.image ? props.image : '/images/image_post.png'} alt="image forum" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{props.title}</div>
                <div className="font text-l mb-2 font-semibold">{props.subtitle}</div>
                <p className="text-gray-700 text-base text-justify">
                  {props.content}
                </p>
              </div>
            </div>
        </UnstyledLink>
      </div>
      
    </>
  )

}