import { useRouter } from 'next/router';
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import CreateForumAPI from '@/api/CreateForumAPI';
import Forum from '@/interfaces/Forum';


function InitialPage({ router, setMyForum, setErrorMessage, setStatus}: {router: any, setMyForum: any, setErrorMessage: any, setStatus: any}) {

  const [title, setTitle] = React.useState('');
  const [subtitle, setSubtitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const forumImage = React.useRef(null);

  function getForumImage(){
    const input: any = forumImage.current;
    if(input.files && input.files.length > 0){
      return input.files[0];
    }

    return undefined;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let slug = title.toLowerCase().replace(' ', '-');

    const res = await CreateForumAPI({
      title,
      subtitle,
      content,
      forum_images: getForumImage()
    });

    const success = res.success;
    if(success){
      const id = res.data.id;
      slug = res.data.slug;
      setMyForum({
        id,
        slug,
        title,
        subtitle,
        content,
      });
      setStatus('SUCCESS');
    } else {
      setErrorMessage("Something went wrong" + res.message);
      setStatus("ERROR");
    }
    setTimeout(() => {router.push('/' + slug)}, 1000);
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

  return (
    <>

    <form className="py-4 grid grid-cols-1 gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start w-full">
        <label htmlFor='forum_images'>Foto Pertanyaan</label>
        <input ref={forumImage} name="forum_images" type="file" accept="image/*" />
      </div>
      <InputText label="Judul Pertanyaan" name="title" type="text" value="" onChange={handleSetTitle} />
      <InputText label="Sub Judul" name="subtitle" type="text" value="" onChange={handleSetSubtitle} />
      <div className="flex flex-col items-start w-full">
        <label htmlFor='content'>Detail Pertanyaan</label>
        <textarea className="w-full" name="content" value={content} onChange={handleSetContent} />
      </div>
      
      <input className="bg-primary-500 text-white font-semibold rounded-xl p-3" type="submit" value="Tambah Pertanyaan" />
    </form>
    </>
  );
}

function ErrorPage({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <h1 className="text-center">{errorMessage}</h1>
    </>
  );
}

function SuccessPage({ myForum }: { myForum: Forum }) {
  return (
    <>
      <h1 className="text-center">Pertanyaan berhasil ditambahkan</h1>
      <div className="flex flex-col items-start w-full">
        <img className="rounded-xl object-cover w-full h-48" alt="forum image" src="https://api-temanhewan.mirzaq.com/image/pet_default.png" />
      </div>
      <div className="flex flex-col items-start w-full">
        <h1 className="text-xl font-semibold">{myForum.title}</h1>
        <h2 className="text-sm font-semibold">{myForum.subtitle}</h2>
        <p className="text-sm">{myForum.content}</p>
      </div>
    </>
  );
}


export default function AddQuestion() {
  const router = useRouter();
  const [status, setStatus] = React.useState<'INITIAL' | 'ERROR' | 'SUCCESS' >('INITIAL');
  const [myForum, setMyForum] = React.useState<Forum>({ id : '', slug: '', title: '', subtitle: '', content: ''});
  const [ errorMessage, setErrorMessage ] = React.useState<string>('');

  return (
    <>
      <Seo title = "Tambah Pertanyaan" />

      <main>
        <ShouldAuthorized roleSpecific='customer'>
          <Sidebar>
            <div className='text-left p-4'>
              <h1 className="text-xl font-semibold">Tambah Pertanyaan</h1>
              {errorMessage !== '' && <ErrorPage errorMessage={errorMessage} /> || status === 'INITIAL' && <InitialPage router = {router} setMyForum={setMyForum} setErrorMessage={setErrorMessage} setStatus={setStatus} /> || status === "SUCCESS" && <SuccessPage myForum={myForum} />}
            </div>
          </Sidebar>
        </ShouldAuthorized>
      </main>
    </>
  )
}