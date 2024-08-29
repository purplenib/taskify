export type LoginRequestDto = {
  email: string;
  password: string;
};

export type UserServiceReponseDto = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  nullable: true;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseDto = {
  user: UserServiceReponseDto;
  accessToken: string;
};
