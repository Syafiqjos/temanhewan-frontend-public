import { useRouter } from 'next/router';
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import InputText from '@/components/forms/InputText';
import SidebarDoctor from '@/components/layout/SidebarDoctor';
import Seo from '@/components/Seo';

import CreateCommentAPI from '@/api/CreateCommentAPI';

function InitialPage({ router, setErrorMessage, setStatus}: {router: any, setErrorMessage:any, setStatus:any}) {
  const [content, setContent] = React.useState('');
  const [commentImage, setCommentImage] = React.useState<string[]>([]);
  let forum_id = ''

  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      
      forum_id = router.query.id as string
  
    })
  })

  async function handleSubmit(e: any) {
    const images = commentImage

    const res = await CreateCommentAPI({
      content,
      forum_id,
      comment_images: images
      
    });

    setTimeout(() => {router.push('/dashboard/my-comment')}, 1000)

  }

  function handleSetContent(e: any) {
    setContent(e.target.value)
  }

  function handleSetCommentImages(e: any) {
    setCommentImage(e.target.files)
  }

  return (
    <>
       <form className="py-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start w-full">
          <label htmlFor='comment_images'>Foto Komentar</label>
          <input name="comment_images" type="file" accept="image/*" multiple onChange={handleSetCommentImages} />
        </div>
        <InputText label="Komentar" name="content" type="text" value='' onChange={handleSetContent} />
        <input className="bg-primary-500 text-white font-semibold rounded-xl p-3" type="submit" value="Tambah Komentar" />
      </form>
    </>
  )
}

function ErrorPage({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <p className="text-center">{errorMessage}</p>
    </>
  );
}


function SuccessPage() {
  return (
    <>
      <h1 className="text-center pt-3">Pertanyaan berhasil ditambahkan</h1>
    </>
  );
}

export default function AddDetailComment() {
  const router = useRouter();
  const [status, setStatus] = React.useState<'INITIAL' | 'ERROR' | 'SUCCESS' >('INITIAL');
  // const [addComment, setAddComment] = React.useState<AddComment>( {forum_id: '', content: '', comment_images: []})
  const [ errorMessage, setErrorMessage ] = React.useState<string>('');

  return (
    <>
      <Seo title = "Add Comment" />

      <SidebarDoctor>
        <main>
          <ShouldAuthorized roleSpecific="doctor">
          <div className='text-left p-4'>
                <h1 className="text-xl font-semibold">Tambah Pertanyaan</h1>
                {errorMessage !== '' && <ErrorPage errorMessage={errorMessage} /> || status === 'INITIAL' && <InitialPage router = {router}  setErrorMessage={setErrorMessage} setStatus={setStatus} /> || status === "SUCCESS" && <SuccessPage />}
              </div>
          </ShouldAuthorized>
        </main>

      </SidebarDoctor>
    
    </>
  )

}