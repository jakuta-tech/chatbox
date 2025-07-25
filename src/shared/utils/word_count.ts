/**
 * Word Count
 *
 * Word count in respect of CJK characters.
 *
 * Copyright (c) 2015 - 2016 by Hsiaoming Yang.
 *
 * https://github.com/yuehu/word-count
 */
const pattern =
  /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g

/**
 * 统计文本中的字数，支持中日韩字符
 * @param data 要统计的文本
 * @returns 字数
 */
export function countWord(data: string): number {
  try {
    data = typeof data === 'string' ? data : JSON.stringify(data)
    const m = data.match(pattern)
    let count = 0
    if (!m) {
      return 0
    }
    for (let i = 0; i < m.length; i++) {
      if (m[i].charCodeAt(0) >= 0x4e00) {
        count += m[i].length
      } else {
        count += 1
      }
    }
    return count
  } catch (e) {
    // 在共享层不使用 Sentry，简单返回 -1 表示错误
    return -1
  }
} 