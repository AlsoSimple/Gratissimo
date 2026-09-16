// Type definitions for the Gratissimo API
export interface JobCategory {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface WorkType {
  id: number;
  type: string;
}

export interface JobListing {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  organization: string;
  address: string;
  zipcode: number;
  city: string;
  workHome: string;
  regionId: number;
  userId: number;
  jobCategoryId: number;
  workTypeId: number;
  region: Region;
  workType: WorkType;
  jobCategory: JobCategory;
}

export interface Article {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
}

export interface Testimony {
  id: number;
  name: string;
  title: string;
  content: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
