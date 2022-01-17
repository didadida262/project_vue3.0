// 文章格式
export interface PostProps {
  id?: number;
  title: string;
  content: string;
  image?: string;
  createAt: string;
  columnId?: number;
}

export interface SloganProps {
  content: string,
  createTime: string
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
  userPd: string;
  userName: string;
}
