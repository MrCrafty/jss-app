import Head from 'next/head';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import Layout from 'src/Layout';
import { componentBuilder } from 'temp/componentBuilder';
import { GetStaticProps } from 'next';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';
import Link from 'next/link';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>

    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-9xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-5">
        500
      </h1>
      <div>
        <p className="inline-block mr-2 text-3xl">
          There is a problem with the resource you are looking for, and it cannot be displayed.
        </p>
        <Link href={'/'} className="text-blue-400 text-4xl hover:text-blue-600 ">
          Go to the Home page
        </Link>
      </div>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
    </SitecoreContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale || context.defaultLocale || config.defaultLanguage,
  });
  let resultErrorPages: ErrorPages | null = null;

  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      headLinks: [],
      layoutData: resultErrorPages?.serverErrorPage?.rendered || null,
    },
  };
};

export default Custom500;
