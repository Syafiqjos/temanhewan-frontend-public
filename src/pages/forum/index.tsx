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
        <section className='bg-white py-10 2xl:py-40'>
          <div className='container mx-auto px-4'>
            <div className='mb-5 text-center'>
              <h2 className='font-heading mt-8 text-7xl font-bold'>Forum</h2>
            </div>
            {forum.map((forum) => {
              return (
                <div key={forum.id}>
                  <CardForum
                    slug={forum.slug}
                    title={forum.title}
                    subtitle={forum.subtitle}
                    content={forum.content}
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
