
export interface IPostsData {
    postsConnection: {
      edges: Posts[];
    };
  }
  export interface Posts {
    node: Post;
    cursor?: string
  }
  export interface Post {
    id: string;
    author: Author
    slug: string;
    title: string;
    createdAt: string;
    featuredpost: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    categories: Categories[];
    content: {
      raw: any;
    }; 
  }
  export interface Featured{
    author: Author 
    slug: string;
    title: string;
    createdAt: string;
     featuredImage: {
      url: string;
    };

  }
  export interface Comment {
  name: string;
  email: string;
  comment: string;
  slug: string;
  createdAt?: string
  }
   
  export interface Author {
    bio: string;
    name: string;
    id: string;
    photo: {
      url: string;
    };
  }
  export interface Categories {
  name: string;
  slug: string;
  }
  interface IProps {
  posts: Posts[];
  }
  
  export interface Postsdetail{
    title : string;
    createAt : string;
    slug : string
    featuredImage: {
      url: string;
    };
  }
    
  