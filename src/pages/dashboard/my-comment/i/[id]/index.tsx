import { useRouter } from 'next/router';
import * as React from 'react';

import CardDetailForum from '@/components/card/CardDetailForum';
import SidebarDoctor from '@/components/layout/SidebarDoctor';
import Seo from '@/components/Seo';

import GetCommentAPI from '@/api/GetCommentAPI';
import Comment from '@/interfaces/Comment';

export default function DetailMyComment() {
  const router = useRouter();
  const [comment, setComment] = React.useState<Comment>({id:'', content:'', comment_images:[], author: {name: '', avatar:''}, updated_at: ''});

  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const comment_id: string = router.query.id as string

      const res = await GetCommentAPI({ comment_id });

      console.log("ini comment:", res.data);
      setComment(res.data);
      
    })();
  }, [ router.isReady ]);

  return (
    <>
      <Seo title='Detail Comment' />

      <SidebarDoctor>
      <main>
        <section className='bg-white py-10 2xl:py-40'>
          <div className='container mx-auto px-4'>
            <div className='mb-5 text-center'>
              <h2 className='font-heading mt-8 text-3xl font-bold'>Detail Pertanyaan Saya</h2>
            </div>
            <div key = {comment.id} className="pb-1">
              <CardDetailForum
                avatar = {comment.author.avatar}
                author = {comment.author.name}
                date = {comment.updated_at.split(' ')[0]}
                image = {comment.comment_images}
                title = ''
                subtitle = ''
                content = {comment.content}
                />
            </div>
          </div>
        </section>
      </main>
      </SidebarDoctor>
    </>
  );
}
