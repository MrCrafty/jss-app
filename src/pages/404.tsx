import config from 'temp/config';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { siteResolver } from 'lib/site-resolver';
import Link from 'next/link';

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <NotFound />;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      {/* <Layout layoutData={props.layoutData} headLinks={props.headLinks} /> */}
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-9xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-5">
          404
        </h1>
        <div>
          <p className="inline-block mr-2 text-3xl">
            Oops! The page you are looking for is not available.{' '}
          </p>
          <Link href={'/'} className="text-blue-400 text-4xl hover:text-blue-600 ">
            Go to the Home page
          </Link>
        </div>
      </div>
    </SitecoreContext>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale || config.defaultLanguage,
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
      layoutData: resultErrorPages?.notFoundPage?.rendered || null,
    },
  };
};

export default Custom404;
