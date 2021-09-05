// 文章格式
export interface PostProps { 
  id: number;
  title: string;
  content: string;
  image?: string;
  createAt: string;
  columnId: number;
}

// 专栏格式
export interface ColumnProps {
  id: number;
  title: string;
  description: string;
  posts: PostProps[];
}

// 用户信息
export interface UserProps {
  id?: number;
  userName: string;
  isLogin: boolean;
}
