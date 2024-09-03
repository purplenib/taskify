export interface MemberApplicationServiceResponseDto {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  isOwner: boolean;
}

export interface MembersResponseDto {
  members: MemberApplicationServiceResponseDto[];
  totalCount: number;
}
