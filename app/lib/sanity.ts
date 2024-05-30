import { createClient } from 'next-sanity' ;
import ImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    apiVersion: '2023-05-07',
    dataset: 'production',
    projectId: '5d7r4q45',
    useCdn: false,
});

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source);
}