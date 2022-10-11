#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { appendFileSync, readFileSync } from 'node:fs'

const DEFAULT_LOG_PATH = './log.txt'
const argv = yargs(hideBin(process.argv)).usage('Usage: $0 <command> [options]').command(
  'start',
  'Начать игру',
  yargs => {
    return yargs.option('--output', {
      alias: '-o',
      describe: `Путь до файла, по-умолчанию ${DEFAULT_LOG_PATH}`,
      type: 'string'
    })
  },
  (argv) => {
    const number = Math.random() > 0.5 ? 1 : 2
    const [_, userNumber] = argv._
    if (![1, 2].includes(userNumber)) {
      console.error('Вы можете ввести только 1 или 2')
    }
    const logPath = argv.output ?? DEFAULT_LOG_PATH;
    if (userNumber === number) {
      console.log('Вы выиграли!')
      appendFileSync(logPath, String(1), 'utf8');
    } else {
      console.log('Вы проиграли')
      appendFileSync(logPath, String(0), 'utf8');
    }
    console.log(argv)
  }
).command(
  'log',
  'Статистика',
  yargs => {
    return yargs.option('--output', {
      alias: '-o',
      describe: `Путь до файла, по-умолчанию ${DEFAULT_LOG_PATH}`,
      type: 'string'
    })
  },
  (argv) => {
    const logPath = argv.output ?? DEFAULT_LOG_PATH
    const data = readFileSync(logPath, 'utf8')
    const stat = Array.from(data).reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: acc[curr] + 1
      }
    }, { 0: 0, 1: 0 })
    console.log('Статистика')
    console.log('Всего партий:', data.length)
    console.log('Вы выиграли:', stat[1])
    console.log('Вы проиграли:', stat[0])
    console.log('Процент побед:', (stat[1] / data.length * 100).toFixed(2))
  }
).demandCommand().help().argv
