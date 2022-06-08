import * as React from 'react';


export default function CardDetailForum(props: any) {

  return (
    <>
      <div className="p-5">
        <div className="rounded overflow-hidden shadow-lg">
          <div className="flex items-center space-x-4 px-6 py-4">
            <img className="w-10 h-10 rounded-full" src={props.avatar} alt="avatar image" />
            <div className="space-y-1 font-medium dark:text-white">
                <div>{props.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{props.date}</div>
            </div>
          </div>
            <div className = "flex">
                {props.image.map ((image: any) => {
                  return (
                    <img key={image} className="rounded-xl w-80 h-80 flex-auto p-5" src={image[0]} alt="Sunset in the mountains" />
                  )
                })}
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2">{props.title}</div>
              <div className="font text-l mb-2 font-semibold">{props.subtitle}</div>
              <p className="text-gray-700 text-base text-justify">
                {props.content}
              </p>
            </div>
          </div>
      </div>

      <div className="p-5">
  </div>
    
    </>
  )

}