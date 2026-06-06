import request from '@/utils/request'

/** 渠道链接信息 */
export interface ChannelLinkData {
  /** 场景值 */
  sceneValue: string
  /** 小程序 URL Scheme 链接 */
  miniProgramLink: string
  /** H5 跳转链接 */
  h5Link: string
  /** 渠道名称 */
  channelName: string
  /** 小程序落地页路径 */
  page: string
}

/** 统一响应结构 */
export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

/**
 * 根据场景值查询小程序跳转链接
 * @param sceneValue 场景值（如 c1、c12）
 */
export function getChannelLink(sceneValue: string): Promise<ApiResponse<ChannelLinkData>> {
  return request.get(`/app/channel/link/${sceneValue}`)
}
