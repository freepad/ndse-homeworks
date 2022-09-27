import * as readline from 'node:readline/promises'

import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

// See: https://learn.javascript.ru/task/random-int-min-max
function randomInteger (min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

const MIN = 0
const MAX = 100
const number = randomInteger(MIN, MAX)
console.log(`Загадано число в диапазоне от ${MIN} до ${MAX}`)

const ask = async () => {
  const answer = Number(await rl.question('Введите число: '))
  if (Number.isNaN(number)) {
    console.warn('Вы ввели не число')
  }
  if (number > answer) {
    console.log('Больше')
    ask()
  } else if (number < answer) {
    console.log('Меньше')
    ask()
  } else {
    console.log('Отгадано число ', answer)
    rl.close()
  }
}

ask()
