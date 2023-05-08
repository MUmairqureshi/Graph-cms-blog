import { request , gql } from "graphql-request"
import {Categories, Post, IPostsData , Featured , Comment} from '../components/components-type' 
import { graphqlClient } from "./client";

import React from 'react'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
 
export const getPosts = async () => {
    const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
    `;
  const data: IPostsData = await graphqlClient.request(query);
  return data.postsConnection.edges;
}

export const getPostDetails = async (slug : string) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: {slug: $slug}) {
      id
      author {
        bio
        name
        id
        photo {
          url
        }
      }
      slug
      title
      createdAt       
      excerpt
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      content {
        raw
      }
    }
  }
  `;
  const data: { post: Post } = await graphqlClient.request(query, {
    slug,
  });
  return data.post;
};












export const getCategoryPost = async (slug : string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result : IPostsData = await graphqlClient.request( query, { slug });

  return result.postsConnection.edges;
};

 
export const getRecentPosts = async ( )=>{
  
  const query = gql`
  query getRecentPost {
    posts(orderBy: createdAt_ASC, last: 3) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `
const result : {posts :Post[]} = await  graphqlClient.request(query);
return result.posts
} 
export const getSimilarPosts = async (categories : string[], slug : string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const data : {posts: Post[]} = await  graphqlClient.request(query, {
    categories,
    slug,
  
  });
  return data.posts
}


export const getCategories = async () =>{
  const query = gql`
    query getCategories {
    categories {
      name
      slug
    }
  }
  `
  const result : {categories: Categories[]} = await  graphqlClient.request(query)
  return result.categories
}






export const submitComment = async (obj : Comment) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};









export const getComments  = async (slug : string) => {
  const query = gql`
    query getComments($slug : String!) {
    comments(where:{post: {slug : $slug}}) {
      name
      createdAt
      comment
    }
  }
  `
  const result : {comments : Comment[]} = await  graphqlClient.request(query , {
    slug
  })
  return result.comments
}



export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result : {posts : Featured } = await  graphqlClient.request(query);

  return result.posts;
};