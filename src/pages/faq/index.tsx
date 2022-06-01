import * as React from 'react';

import Collapse from '@/components/collapse/Collapse';
import SEO from '@/components/Seo';

export default function FAQ() {
  return (
    <>
      <SEO title='FAQ' />

      <main>
        <section className='bg-primary-50 py-10 2xl:py-40'>
          <div className='container mx-auto px-4'>
            <div className='mb-20 text-center'>
              <h2 className='font-heading mt-8 text-7xl font-bold'>
                FAQ&apos;s
              </h2>
            </div>
            <div className='mx-auto max-w-5xl'>
              <div>
                <dl className='mx-auto mt-8 flex max-w-screen-sm flex-col lg:max-w-screen-lg lg:flex-row lg:flex-wrap'>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Hewan apa yang dapat konsultasi di TemanHewan?'
                      answer='Untuk saat ini kucing, anjing, hamster, dan burung'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Hewan apa yang dapat di-grooming-kan?'
                      answer='Untuk sekarang masih kucing dan anjing saja'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Apakah dapat memanggil dokter ke rumah?'
                      answer='Iya, kamu dapat memanggil dokter hewan ke rumahmu'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Apakah dapat memanggil jasa grooming ke rumah?'
                      answer='Iya, kamu dapat memanggil jasa grooming ke rumahmu'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Apakah saya dapat menyimpan data hewan peliharaan?'
                      answer='Iya, kamu dapat menyimpan data hewan peliharaanmu di dashboard akun'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Pembayaran layanan dilakukan secara apa?'
                      answer='Untuk saat ini, pembayaran menggunakan virtual account dari beberapa bank'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Mengapa saya tidak bisa bertanya di forum?'
                      answer='Kamu harus masuk akun TemanHewan terlebih dahulu untuk bertanya di forum'
                    />
                  </div>
                  <div className='lg:w-1/2'>
                    <Collapse
                      question='Mengapa saya tidak bisa jawab pertanyaan di forum?'
                      answer='Mohon maaf, hanya dokter saja yang dapat menjawab pertanyaan di forum'
                    />
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
