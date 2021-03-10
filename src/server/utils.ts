import { keys, xor } from 'lodash/fp';
import { MongoError } from 'mongodb';
import urlJoin from 'url-join';
import config from './config';

export const isDuplicateErrorOnFields = (error: Error, ...fields: string[]) => {
    if (!(error instanceof MongoError) || error.code !== 11000) {
        return false;
    }

    // @ts-ignore
    const indexFields = keys(error.keyPattern);

    return xor(indexFields, fields).length === 0;
};

export const attachPublicPath = (url: string) => {
    if (url.startsWith('auto')) {
        // webpack manifest link
        return url.replace('auto', config.publicPath);
    }

    // other links
    return urlJoin(config.publicPath, url);
};
