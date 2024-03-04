export interface Member {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export enum MemberEnumType {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface User {
  id: string;
  name: string;
  balance: number;
}
