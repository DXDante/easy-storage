/**
 * @public
 * Storage 存储方式简化
 */
export type storageType = 'session' | 'local'

/**
 * @public
 * Storage 存储方式全称
 */
export type storageFullType = 'sessionStorage' | 'localStorage'

/**
 * @public
 * 获取 Storage 存储方式
 */
export interface IGetStorageType {
  (type: storageType): storageFullType
}

/**
 * @public
 * 检查参数入参
 */
export interface ICheckParams {
  type: storageType
  key?: string
  data?: unknown,
  filterFields?: string[]
}

/**
 * @public
 * 检查参数
 */
export interface ICheck {
  (options: ICheckParams): string
}

/**
 * @public
 * 同步获取 Storage
 */
export interface IGetStorage {
  <T>(type: storageType, key: string): T
}

/**
 * @public
 * 异步获取 Storage
 */
export interface IGetStorageAsync extends IGetStorage {
  <T>(type: storageType, key: string): Promise<T>
}

/**
 * @public
 * 同步/异步设置 Storage
 */
export interface ISetStorage {
  (type: storageType, key: string, data: unknown): void
}

/**
 * @public
 * 同步/异步移除 Storage
 */
export interface IRemoveStorage {
  (type: storageType, key: string): void
}

/**
 * @public
 * 同步/异步清空 Storage
 */
export interface IClearStorage {
  (type: storageType | 'all'): void
}
