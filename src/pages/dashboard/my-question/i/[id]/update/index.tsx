import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import GetForumAPI from '@/api/GetForumAPI';
import UpdateForumAPI from '@/api/UpdateForumAPI';
import Forum from '@/interfaces/Forum';

function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <ul>
          <img className="rounded-xl object-cover w-full h-auto" src="/images/cover/register-cover.png" alt="register image"/>
        </ul>
      </div>
      <div className="grid grid-cols-1">
        <h1>Pertanyaan tidak ditemukan</h1>
      </div>
    </>
  )
}

function LoadingPage() {
  return(
    <>
      <div className="flex flex-col gap-1">
        <ul>
          <img className="rounded-xl object-cover w-full h-auto" src="/images/cover/register-cover.png" alt="register image" />
        </ul>
      </div>
      <div className="grid grid-cols-1">
        <h1>Memuat..</h1>
      </div>
    </>
  )
}

function SuccessPage({ myForum }: { myForum: Forum }) {
  const router = useRouter();

  const forumImageInput = React.useRef(null);
  const [title, setTitle] = React.useState(myForum.title);
  const [subtitle, setSubtitle] = React.useState(myForum.subtitle);
  const [content, setContent] = React.useState(myForum.content);

  function getForumImage(){
    const input: any = forumImageInput.current!;
    if(input.files && input.files.length > 0){
      return input.files;
    }

    return undefined;
  }

  function handleSetTitle(e: any) {
    setTitle(e.target.value);
  }

  function handleSetSubtitle(e: any) {
    setSubtitle(e.target.value);
  }

  function handleSetContent(e: any) {
    setContent(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await UpdateForumAPI({
      id: myForum.id!,
      title: title,
      subtitle: subtitle,
      content: content,
      forum_images: getForumImage()
    });

    if(res.success) {
      router.push(`/dashboard/my-question/i/${myForum.id}`);
    } else {
      console.log(res.message);
    }
  }

  return (
    <>
      <form className="py-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start w-full">
          <label htmlFor='forum_images'>Foto Pertanyaan</label>
          <input ref={forumImageInput} name="forum_images[]" type="file" accept="image/*" multiple />
        </div>
        <InputText label="Judul Pertanyaan" name="title" type="text" value={title} onChange={handleSetTitle} />
        <InputText label="Sub Judul" name="subtitle" type="text" value={subtitle} onChange={handleSetSubtitle} />
        <div className="flex flex-col items-start w-full">
          <label htmlFor='content'>Detail Pertanyaan</label>
          <textarea className="w-full" name="content" value={content} onChange={handleSetContent} />
        </div>
        
        <input className="bg-primary-500 text-white font-semibold rounded-xl p-3" type="submit" value="Perbarui Pertanyaan" />
      </form>
    </>
  )

}

export default function UpdateMyQuestion() {
  const router = useRouter()
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS'>('LOADING')
  const [ forum, setForum ] = React.useState<Forum>({ id : '', slug: '', title: '', subtitle: '', content: '', forum_images: [], author : {}, updated_at: '' })

  React.useEffect(() => {
    ( async () => {
      if (!router.isReady) return;

      const id: string = router.query.id as string

      const resForum = await GetForumAPI({ id })
      
      if(resForum.id != ''){
        setStatus("SUCCESS");
        setForum(resForum.data)
      } else {
        setStatus("NOTFOUND");
      }
    })();}, [ router.isReady ]);

  return (
    <>
    <Seo title="Update Question"/>

    <Sidebar>
      <main>
        <ShouldAuthorized roleSpecific='customer'>
          <section className="bg-white">
            <div className="layout grid grid-cols-1 mt-8 w-100">
              <h1 className="text-xl font-semibold mb-2">Perbarui Pertanyaan saya</h1>
              <div className="grid grid-cols-2 gap-3">
                {status === 'LOADING' && <LoadingPage />
                || status === 'NOTFOUND' && <NotFoundPage />
                || status === 'SUCCESS' && <SuccessPage myForum={forum} />
                }
              </div>
            </div>
          </section>
        </ShouldAuthorized>
      </main>
    </Sidebar>

    </>
  )
  
}
