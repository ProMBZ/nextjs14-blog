import { Card, CardContent } from '@/components/ui/card';
import { simpleBlogCard } from './lib/interface';
import { client, urlFor } from './lib/sanity'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Link from 'next/link'

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query)

  return data;
}


export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  console.log(data);
  return (
   <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-6 text-center'>
    {data.map((post, idx) => (
    <Card key={idx}>
      <Image 
      src={urlFor(post.titleImage).url()}
       alt="image"
        width={500} 
        height={500}
        className='rounded-t-lg h-[250px]  '
        />


        <CardContent className="mt-5">
        <h3 className=" text-center  text-lg line-clamp-2">{post.title}</h3>
        <p className='text-center text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300'>{post.smallDescription}</p>
        <br />
        <Button asChild className=" w-60  mt-3  m-3">
          <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
        </Button>
        </CardContent>
    </Card>
    ))}

   </div>
  );
}
