import {
  DictionaryService,
  RestDictionaryService,
  GraphQLDictionaryService,
  constants,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

/**
 * Factory responsible for creating a DictionaryService instance
 */
export class DictionaryServiceFactory {
  /**
   * @param {string} siteName site name
   * @returns {DictionaryService} service instance
   */
  create(siteName: string): DictionaryService {
    const sites: SiteInfo[] = JSON.parse(config.sites);

    const rootItemId =
      (sites.find((site) => site.name === siteName)?.rootItemId as string) ??
      '{D7068BB3-814C-4EC7-84A3-7BEAA739FAA6}';
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLDictionaryService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName,
          rootItemId,
          // rootItemId: '{D7068BB3-814C-4EC7-84A3-7BEAA739FAA6}',

          /*
            The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current app. 
            When not provided, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
            For SXA site(s) and multisite setup there's no need to specify it - it will be autoresolved.
            Otherwise, if your Sitecore instance only has 1 JSS App (i.e. in a Sitecore XP setup), you can specify the root item ID here.
            rootItemId: '{GUID}'
          */
        })
      : new RestDictionaryService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
        });
  }
}

/** DictionaryServiceFactory singleton */
export const dictionaryServiceFactory = new DictionaryServiceFactory();
