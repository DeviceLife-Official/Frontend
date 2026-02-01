import type { CommonResponse } from "../common";

export type TagType = 'INTEREST' | 'LIFESTYLE' | 'BRAND';

export type Tag = {
  tagId: number;
  tagKey: string;
  tagLabel: string; 
  tagType: TagType;
};

// 태그 조회 응답 result 타입
export type GetTagsResult = Tag[];

// 태그 조회 응답 타입
export type GetTagsResponse = CommonResponse<GetTagsResult>;

// 유저 태그 등록 요청 타입
export type PostUserTagsRequest = {
  tagIds: number[];
};

// 유저 태그 등록 응답 result 타입
export type PostUserTagsResult = null;

// 유저 태그 등록 응답 타입
export type PostUserTagsResponse = CommonResponse<PostUserTagsResult>;