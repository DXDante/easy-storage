import type * as Base from '../typings'

import { storageTypes, storageFullTypes } from '../config'
import { isString, isObjectLike, isNumber } from 'lodash-es'

const cookieEnabled = !!window.document.cookie || window.navigator.cookieEnabled

// 获取存储类型
const getStorageType: Base.IGetStorageType = (type) => {
  return storageFullTypes[storageTypes.indexOf(type)] || 'sessionStorage'
}

// 检查
const check: Base.ICheck = ({ type, key, data, filterFields = [] }) => {
  if (!cookieEnabled) {
    return "storage sessionStorage / localStorage 未被启用, 无法存储"
  }

  if (!getStorageType(type)) {
    return "storage 存储类型参数错误"
  }

  if (!filterFields.includes(key) && !isString(key)) {
    return "storage 存储键参数错误"
  }

  if (!filterFields.includes(key) && typeof data === 'object' && data !== null && !(isObjectLike(data))) {
    return "storage 数据必须是原始类型为 String、Number、Boolean, 引用类型为字面量数组、对象"
  }

  return ''
}

/**
 * 同步获取 Storage
 * @param { String } type 本地存储类型 ('session' | 'local')
 * @param { String } key  存储键名
 * @return { T }          自动进行 JSON 转换
 */
export const getStorage: Base.IGetStorage = (type, key) => {
  const errorMessage = check({ type, key })
  if (errorMessage) {
    throw new Error(errorMessage)
  }

  const storageType = getStorageType(type)
  const originalValue = window[storageType].getItem(key)
  const expireTimeString: string|null = type === 'local' ? window[storageType].getItem(`${key}_EXPIRE_TIME`) : null
  let resultValue = null,
      expireTimeValue: number = 0

  try {
    expireTimeValue = JSON.parse(expireTimeString) || 0
  } catch (err) { }

  try {
    // 正常获取
    if (expireTimeValue === 0 || expireTimeValue > Date.now()) {
      resultValue = JSON.parse(originalValue)
    }
    // 过期移除
    else {
      removeStorage(type, key)
      removeStorage(type, `${key}_EXPIRE_TIME`)
    }
  } catch (err) {
    originalValue === 'undefined' && (resultValue = undefined)
  } finally {
    return resultValue
  }
}

/**
 * 异步获取 Storage
 * @param { String } type 本地存储类型 ('session' | 'local')
 * @param { String } key  存储键名
 * @return { Promise<T> } 自动进行 JSON 转换
 */
export const getStorageAsync: Base.IGetStorageAsync = (type, key) => {
  return Promise.resolve().then(() => getStorage(type, key))
}

/**
 * 同步设置 Storage
 * @param { String } type   本地存储类型 ('session' | 'local')
 * @param { String } key    存储键名
 * @param { unknown } data  存储的数据 (自动进行 JSON 转换)
 * @param { Date|Number } options.expireTime  过期时间 (支持 Date 对象、数字时间戳)
 */
export const setStorage: Base.ISetStorage = (type, key, data, options = {}) => {
  const errorMessage = check({ type, key, data })
  if (errorMessage) {
    throw new Error(errorMessage)
  }

  let { expireTime } = options
  const storageType = getStorageType(type)
  window[storageType].setItem(key, JSON.stringify(data))

  // 设置过期时间(只 local 生效)
  expireTime = expireTime instanceof Date ? expireTime.getTime() : expireTime
  if (type === 'local' && isNumber(expireTime) && expireTime > 0) {
    window[storageType].setItem(`${key}_EXPIRE_TIME`, JSON.stringify(expireTime))
  }
}

/**
 * 异步设置 Storage
 * @param { String } type   本地存储类型 ('session' | 'local')
 * @param { String } key    存储键名
 * @param { unknown } data  存储的数据 (自动进行 JSON 转换)
 */
export const setStorageAsync: Base.ISetStorage = (type, key, data, options = {}) => {
  Promise.resolve().then(() => setStorage(type, key, data, options))
}

/**
 * 同步移除 Storage
 * @param { String } type   本地存储类型 ('session' | 'local')
 * @param { String } key    存储键名
 */
export const removeStorage: Base.IRemoveStorage = (type, key) => {
  const errorMessage = check({ type, key })
  if (errorMessage) {
    throw new Error(errorMessage)
  }

  const storageType = getStorageType(type)
  window[storageType].removeItem(key)
  window[storageType].removeItem(`${key}_EXPIRE_TIME`)
}

/**
 * 异步移除 Storage
 * @param { String } type   本地存储类型 ('session' | 'local')
 * @param { String } key    存储键名
 */
export const removeStorageAsync: Base.IRemoveStorage = (type, key) => {
  Promise.resolve().then(() => removeStorage(type, key))
}

/**
 * 同步清空 Storage
 * @param { String } type   本地存储类型 ('session' | 'local' | 'all')
 */
export const clearStorage: Base.IClearStorage = (type) => {
  if (!cookieEnabled) {
    throw new Error("storage sessionStorage / localStorage 未被启用, 无法存储")
  }

  if (type === 'all') {
    window.sessionStorage.clear()
    window.localStorage.clear()
    return
  }

  const storageType = getStorageType(type)
  window[storageType].clear()
}

/**
 * 异步清空 Storage
 * @param { String } type   本地存储类型 ('session' | 'local' | 'all')
 */
export const clearStorageAsync: Base.IClearStorage = (type) => {
  Promise.resolve().then(() => clearStorage(type))
}
