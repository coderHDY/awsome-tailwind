export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserResponse = {
  data: User;
};