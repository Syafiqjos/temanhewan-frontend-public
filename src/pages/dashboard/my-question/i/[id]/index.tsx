import { useRouter } from 'next/router';
import * as React from'react';

import CardDetailForum from '@/components/card/CardDetailForum';
import Seo from '@/components/Seo';

import DeleteForumAPI from '@/api/DeleteForumAPI';
import GetForumAPI from '@/api/GetForumAPI';
import GetForumCommentsAPI from '@/api/GetForumCommentsAPI';
import Comment from '@/interfaces/Comment';
import Forum from '@/interfaces/Forum';


export default function DetailForum() {
  const [ forum, setForum ] = React.useState<Forum>({ id: '', slug:'', title: '', subtitle: '', content: '', forum_images:[], author: {name: '', avatar: ''}, updated_at: '' });
  const [ comment, setComment] = React.useState<Comment[]>( [] );
  const router = useRouter();

  async function handleDeleteQuestion() {

    const res = await DeleteForumAPI({ id: forum.id! });

    if(res.success) {
      router.push('/dashboard/my-question');
    }
  }

  async function handleUpdateQuestion() {
    router.push(`/dashboard/my-question/i/${forum.id}/update`);
  }

  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const id: string = router.query.id as string
      const forum_id : string = id

      const resForum = await GetForumAPI({ id });
      const resComment = await GetForumCommentsAPI({ forum_id });

      if(resComment.data.length > 0){
        setComment(resComment.data);
      } 

      const dataForum = resForum.data;
      setForum(dataForum);
    })();
  }, [ router.isReady ]);

  return (
    <>
      <Seo title="Detail Forum" />

      <main>
        <section className='bg-white py-10 2xl:py-40'>
          <div className='container mx-auto px-4'>
            <div className='mb-5 text-center'>
              <h2 className='font-heading mt-8 text-3xl font-bold'>Detail Pertanyaan Saya</h2>
            </div>
            <div key = {forum.id} className="pb-1">
              <CardDetailForum
                avatar = {forum.author.avatar}
                author = {forum.author.name}
                date = {forum.updated_at.split(' ')[0]}
                image = {forum.forum_images}
                title = {forum.title}
                subtitle = {forum.subtitle}
                content = {forum.content}
                />
            </div>
            
            {comment.length > 0 ? (
              comment.map((item) => (
                <>
                <p className="px-4 text-2xl font-bold">Comment:</p>
                <div key = {item.id} className="pb-5">
                    <CardDetailForum
                      author = {item.author.name}
                      avatar = {item.author.avatar}
                      date = {item.updated_at.split(' ')[0]}
                      image = {item.comment_images}
                      title = ''
                      subtitle = ''
                      content = {item.content}
                      />
                </div>
                </>
              ))
                ) : (
                  <>
                    <div className = "layout">
                      <div className="flex justify-center">
                        <div className="px-3">
                          <button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2 w-full" onClick={handleDeleteQuestion}>Hapus Pertanyaan</button>
                        </div>
                        <div className="px-3">
                          <button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2 w-full" onClick={handleUpdateQuestion}>Perbarui Pertanyaan</button>
                        </div>
                      </div>
                    </div>
                  </>
                )
            }
          </div>
        </section>
      </main>
    </>
  )

}
