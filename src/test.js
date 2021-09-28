const same = (word1, word2) => {
  if ((word1.length === 0 && word2.length !== 0) || (word1.length !== 0 && word2.length === 0)) {
    return false
  }
  let num1 = word1.split('')
  let num2 = word2.split('')
  const set = Array.from(new Set(num1.concat(num2)))
  return set.length === num1.length
}

console.log(same('bty', ''))