import * as React from 'react';

import UnstyledLink from '../links/UnstyledLink';


export default function CardForum(props: any) {

  return (
    <>
      <div className="p-5">
        <UnstyledLink href={props.slug}>
            <div className="max-w-7xl rounded overflow-hidden shadow-lg hover:bg-primary-50">
              <div className="">
                <img className="rounded-t-xl object-cover w-full h-64 object-top" src={props.image ? props.image : '/images/image_post.png'} alt="image forum" />
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