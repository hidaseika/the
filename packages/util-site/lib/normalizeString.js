/**
 * @memberof module:@the-/util-site
 * Convert into japanese strings.
 * 英数字記号は半角、カナは全角へ
 * @function formatString
 * @param {string}
 * @see https://gist.github.com/think49/964592/96c2d034ee07d6c2044e501d4e06b73a6a9e1c72
 * @returns {string}
 */
'use strict'

const hankakuKana = [
  'ｧ',
  'ｨ',
  'ｩ',
  'ｪ',
  'ｫ',
  'ｬ',
  'ｭ',
  'ｮ',
  'ｯ',
  'ｰ',
  'ｳﾞ',
  'ｶﾞ',
  'ｷﾞ',
  'ｸﾞ',
  'ｹﾞ',
  'ｺﾞ',
  'ｻﾞ',
  'ｼﾞ',
  'ｽﾞ',
  'ｾﾞ',
  'ｿﾞ',
  'ﾀﾞ',
  'ﾁﾞ',
  'ﾂﾞ',
  'ﾃﾞ',
  'ﾄﾞ',
  'ﾊﾞ',
  'ﾋﾞ',
  'ﾌﾞ',
  'ﾍﾞ',
  'ﾎﾞ',
  'ﾊﾟ',
  'ﾋﾟ',
  'ﾌﾟ',
  'ﾍﾟ',
  'ﾎﾟ',
  'ｱ',
  'ｲ',
  'ｳ',
  'ｴ',
  'ｵ',
  'ｶ',
  'ｷ',
  'ｸ',
  'ｹ',
  'ｺ',
  'ｻ',
  'ｼ',
  'ｽ',
  'ｾ',
  'ｿ',
  'ﾀ',
  'ﾁ',
  'ﾂ',
  'ﾃ',
  'ﾄ',
  'ﾅ',
  'ﾆ',
  'ﾇ',
  'ﾈ',
  'ﾉ',
  'ﾊ',
  'ﾋ',
  'ﾌ',
  'ﾍ',
  'ﾎ',
  'ﾏ',
  'ﾐ',
  'ﾑ',
  'ﾒ',
  'ﾓ',
  'ﾔ',
  'ﾕ',
  'ﾖ',
  'ﾗ',
  'ﾘ',
  'ﾙ',
  'ﾚ',
  'ﾛ',
  'ﾜ',
  'ｦ',
  'ﾝ',
]
const zenkakuKana = [
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
  'ャ',
  'ュ',
  'ョ',
  'ッ',
  'ー',
  'ヴ',
  'ガ',
  'ギ',
  'グ',
  'ゲ',
  'ゴ',
  'ザ',
  'ジ',
  'ズ',
  'ゼ',
  'ゾ',
  'ダ',
  'ヂ',
  'ヅ',
  'デ',
  'ド',
  'バ',
  'ビ',
  'ブ',
  'ベ',
  'ボ',
  'パ',
  'ピ',
  'プ',
  'ペ',
  'ポ',
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'キ',
  'ク',
  'ケ',
  'コ',
  'サ',
  'シ',
  'ス',
  'セ',
  'ソ',
  'タ',
  'チ',
  'ツ',
  'テ',
  'ト',
  'ナ',
  'ニ',
  'ヌ',
  'ネ',
  'ノ',
  'ハ',
  'ヒ',
  'フ',
  'ヘ',
  'ホ',
  'マ',
  'ミ',
  'ム',
  'メ',
  'モ',
  'ヤ',
  'ユ',
  'ヨ',
  'ラ',
  'リ',
  'ル',
  'レ',
  'ロ',
  'ワ',
  'ヲ',
  'ン',
]

const replacePairs = [
  [/\u2019/g, '\u0027'],
  [/\u201D/g, '\u0022'],
  [/\u3000/g, '\u0020'],
  [/\uFFE5/g, '\u005C'],
  [
    /[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g,
    (token) => String.fromCharCode(token.charCodeAt(0) - 65248),
  ],
  ...hankakuKana.map((_, i) => [hankakuKana[i], zenkakuKana[i]]),
]

/** @lends module:@the-/util-site.normalizeString */
function normalizeString(src) {
  if (!src) {
    return src
  }
  if (typeof src !== 'string') {
    return src
  }

  return replacePairs.reduce(
    (replaced, [from, to]) => replaced.replace(from, to),
    String(src),
  )
}

module.exports = normalizeString
