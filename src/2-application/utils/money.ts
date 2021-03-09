export const moneyToReal = (money: number, prefix: 'R$' | '' = '') => {
  let moneySplit = money.toFixed(2).split('.')
  moneySplit[0] = `${prefix}${moneySplit[0].split(/(?=(?:...)*$)/).join('.')}`
  return moneySplit.join(',')
}
