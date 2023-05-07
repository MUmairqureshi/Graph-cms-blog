import React, { FC } from 'react';
import { useRouter } from 'next/router';
// Posts
import { getCategories, getCategoryPost   } from '../../serveces/index';
import { PostCard, Categories } from '../../components/index';
import { Posts } from '../../components/components-type';

const CategoryPost  :FC<{ posts: Posts[] }> = ({ posts }) => {
  const router = useRouter();
 

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

type prop = {
  params:{
    slug : string
  }
}
export async function getStaticProps({ params } : prop) {
  const posts = await (getCategoryPost(params.slug));

  return {
    props: {  posts  },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}