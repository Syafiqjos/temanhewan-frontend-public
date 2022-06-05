import * as React from 'react';

import ShouldAuthorized from '@/components//auths/ShouldAuthorized';
import CardForum from '@/components/card/CardForum';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import GetMyForumAPI from '@/api/GetMyForumAPI';
import Forum from '@/interfaces/Forum';

export default function MyForum() {
  const [myForum, setMyForum] = React.useState<Forum[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await GetMyForumAPI({ offset: 0, limit: 10 });
      setMyForum(res.data);
    })();
  }, []);

  return (
    <>
      <Seo title='My Questions' />

      <main>
        <ShouldAuthorized roleSpecific='customer'>
          <Sidebar>
            <div>
              <h1 className='p-5 text-xl font-semibold'>Pertanyaan Saya</h1>
              {myForum.map((forum) => {
                return (
                  <div key={forum.id}>
                    <CardForum
                      image = {forum.forum_images ? forum.forum_images[0] : '/images/image_post.png'}
                      slug={forum.slug}
                      title={forum.title}
                      subtitle={forum.subtitle}
                      content={forum.content.length > 200 ? forum.content.substring(0, 200) + '...' : forum.content}
                    />
                  </div>
                );
              })}
            </div>
          </Sidebar>
        </ShouldAuthorized>
      </main>
    </>
  );
}
