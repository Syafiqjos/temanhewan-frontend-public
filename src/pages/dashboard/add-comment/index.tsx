import * as React from 'react';

import CardForum from '@/components/card/CardForum';
import SidebarDoctor from '@/components/layout/SidebarDoctor';
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

      <SidebarDoctor>
        <main>
          <section className='bg-white py-10 2xl:py-40 layout'>
            <div className='container mx-auto'>
              <div className='mb-5 text-center'>
              </div>
              {forum.map((forum) => {
                return (
                  <div key={forum.id}>
                    <CardForum
                      author = {forum.author.name}
                      avatar = {forum.author.avatar}
                      date = {forum.updated_at.split(' ')[0]}
                      image = {forum.forum_images ? forum.forum_images[0] : '/images/image_post.png'}
                      slug={'/dashboard/add-comment/i/' + forum.id}
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
      </SidebarDoctor>
    </>
  );
}
