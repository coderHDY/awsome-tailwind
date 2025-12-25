export type User = {
  _id: string; // MongoDB 的 _id (ObjectId 字符串)
  name: string;
  email: string;
};

export type UserResponse = {
  data: User;
};