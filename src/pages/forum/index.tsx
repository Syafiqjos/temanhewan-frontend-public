import * as React from 'react';

import CardForum from '@/components/card/CardForum';
import Seo from '@/components/Seo';

import GetPublicForumAPI from '@/api/GetPublicForumAPI';
import Forum from '@/interfaces/Forum';

export default function ForumView() {
  const [forum, setForum] = React.useState<Forum[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await GetPublicForumAPI({ offset: 0, limit: 10 });
      const data = response.data;
      setForum(data);
    })();
  }, []);

  return (
    <>
      <Seo title='Forum' />

      <main>
        <section className='bg-white py-10 2xl:py-40 layout'>
          <div className='container mx-auto'>
            <div className='mb-5 text-center'>
              <h2 className='font-heading mt-8 text-7xl font-bold'>Forum</h2>
            </div>
            {forum.map((forum) => {
              return (
                <div key={forum.id}>
                  <CardForum
                    author = {forum.author.name}
                    avatar = {forum.author.avatar}
                    date = {forum.updated_at.split(' ')[0]}
                    image = {forum.forum_images ? forum.forum_images[0] : '/images/image_post.png'}
                    slug={'/forum/i/' + forum.id}
                    title={forum.title}
                    subtitle={forum.subtitle}
                    content={forum.content.length > 200 ? forum.content.substring(0, 200) + '...' : forum.content}
                    
                  />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
