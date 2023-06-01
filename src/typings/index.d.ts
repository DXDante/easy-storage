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
  <T>(type: storageType, key: string): T | null
}

/**
 * @public
 * 异步获取 Storage
 */
export interface IGetStorageAsync extends IGetStorage {
  <T>(type: storageType, key: string): Promise<T | null>
}

/**
 * @public
 * 设置 Storage 额外选项
 */
export interface ISetStorageOptions {
  expireTime?: Date | number
}

/**
 * @public
 * 同步/异步设置 Storage
 */
export interface ISetStorage {
  (type: storageType, key: string, data: unknown, options?: ISetStorageOptions): void
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

/**
 * @public
 * 同步获取 Storage 接口声明
 */
export declare const getStorage: IGetStorage

/**
 * @public
 * 异步获取 Storage 接口声明
 */
export declare const getStorageAsync: IGetStorageAsync

/**
 * @public
 * 同步设置 Storage 接口声明
 */
export declare const setStorage: ISetStorage

/**
 * @public
 * 异步设置 Storage 接口声明
 */
export declare const setStorageAsync: ISetStorage

/**
 * @public
 * 同步移除 Storage 接口声明
 */
export declare const removeStorage: IRemoveStorage

/**
 * @public
 * 异步移除 Storage 接口声明
 */
export declare const removeStorageAsync: IRemoveStorage

/**
 * @public
 * 同步清空 Storage 接口声明
 */
export declare const clearStorage: IClearStorage

/**
 * @public
 * 异步清空 Storage 接口声明
 */
export declare const clearStorageAsync: IClearStorage