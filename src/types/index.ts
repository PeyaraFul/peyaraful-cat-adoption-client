export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  location?: string;
  phone?: string;
  bio?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Cat {
  _id: string;
  ownerId: string;
  name: string;
  age: number;
  breed: string;
  photo: string;
  description: string;
  location: string;
  gender: 'male' | 'female';
  healthStatus: string;
  vaccinationStatus: string;
  temperament: string;
  status: 'available' | 'pending' | 'adopted';
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  _id: string;
  userId: string;
  userName: string;
  userImage: string;
  catName: string;
  content: string;
  image: string;
  likes: number;
  createdAt: string;
}

export interface AdoptionRequest {
  _id: string;
  catId: string;
  catName: string;
  catPhoto: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  createdAt: string;
  updatedAt?: string;
}
