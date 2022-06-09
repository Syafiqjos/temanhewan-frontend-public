import * as React from 'react';

import ShouldAuthorized from '@/components//auths/ShouldAuthorized';
import CardForum from '@/components/card/CardForum';
import SidebarDoctor from '@/components/layout/SidebarDoctor';
import Seo from '@/components/Seo';

import GetMyCommentAPI from '@/api/GetMyCommentAPI';
import Comment from '@/interfaces/Comment';

export default function MyComment() {
  const [myComment, setMyComment] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await GetMyCommentAPI({ offset: 0, limit: 10 });
      setMyComment(res.data);
    })();
  }, []);

  return (
    <>
      <Seo title='My Comments' />

      <SidebarDoctor>
        <main>
          <ShouldAuthorized roleSpecific='doctor'>
              <div>
                <h1 className='p-5 text-xl font-semibold'>Komentar Saya</h1>
                {myComment.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <CardForum
                        avatar = 'none'
                        image = {comment.comment_images ? comment.comment_images[0] : '/images/image_post.png'}
                        slug={'/dashboard/my-comment/i/' + comment.id}
                        content={comment.content.length > 200 ? comment.content.substring(0, 200) + '...' : comment.content}
                      />
                    </div>
                  );
                })}
              </div>
          </ShouldAuthorized>
        </main>
      </SidebarDoctor>
    </>
  );
}
