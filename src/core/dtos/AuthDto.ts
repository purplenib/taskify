export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface UserServiceReponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponseDto {
  user: UserServiceReponseDto;
  accessToken: string;
}
