import Head from 'next/head';

const MetaTag = (props: {
  title?: string;
  description?: string;
  image?: string;
}) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title || '공간이음'}</title>
      <meta
        name='description'
        content={
          description ||
          '공간이음에서 팝업스토어를 운영할 수 있는 건물들을 확인해보세요.'
        }
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title || '공간이음'} />
      <meta
        property='og:description'
        content={
          description ||
          '공간이음에서 팝업스토어를 운영할 수 있는 건물들을 확인해보세요.'
        }
      />
      <meta property='og:image' content={image || '/icons/logo.svg'} />
      <meta property='og:url' content='https://neul-pum.vercel.app/' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='공간이음' />
      <meta property='og:locale' content='ko' />
    </Head>
  );
};

export default MetaTag;
