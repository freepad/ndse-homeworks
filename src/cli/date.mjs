#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).usage('Usage: $0 <command> [options]').command(
  'current',
  'Текущая дата и время в формате ISO 8601',
  yargs => {
    return yargs.option('--year', {
      alias: '-y',
      describe: 'Текущий год'
    }).option('--month', {
      alias: '-m',
      describe: 'Текущий месяц'
    }).check((argv) => {
      if (argv.year && argv.month) {
        throw new Error(
          'Разрешено использовать только один аргумент --year или --month. Пример: ./date.mjs current --year')
      }
      return true
    })
  },
  (argv) => {
    const date = new Date()
    if (argv.year) {
      console.log(date.getUTCFullYear())
    } else if (argv.month) {
      console.log(date.getUTCMonth())
    } else {
      console.log(date.toISOString())
    }
  }
).command(
  'add',
  'Увеличить текущую дату',
  yargs => {
    return yargs.option('--year', {
      alias: '-y',
      describe: 'Добавить год',
      type: 'number'
    }).option('--month', {
      alias: '-m',
      describe: 'Добавить месяц',
      type: 'number'
    }).option('--day', {
      alias: '-d',
      describe: 'Добавить день',
      type: 'number'
    })
  },
  (argv) => {
    const date = new Date()
    if (argv.year) {
      date.setUTCFullYear(date.getUTCFullYear() + argv.year)
    }
    if (argv.month) {
      date.setUTCMonth(date.getUTCMonth() + argv.month)
    }
    if (argv.day) {
      date.setUTCDate(date.getUTCDay() + argv.day)
    }
    console.log(date.toISOString())
  }
).command(
  'sub',
  'Уменьшить текущую дату',
  yargs => {
    return yargs.option('--year', {
      alias: '-y',
      describe: 'Добавить год',
      type: 'number'
    }).option('--month', {
      alias: '-m',
      describe: 'Добавить месяц',
      type: 'number'
    }).option('--day', {
      alias: '-d',
      describe: 'Добавить день',
      type: 'number'
    })
  },
  (argv) => {
    const date = new Date()
    if (argv.year) {
      date.setUTCFullYear(date.getUTCFullYear() - argv.year)
    }
    if (argv.month) {
      date.setUTCMonth(date.getUTCMonth() - argv.month)
    }
    if (argv.day) {
      date.setUTCDate(date.getUTCDay() - argv.day)
    }
    console.log(date.toISOString())
  }
).demandCommand().help().argv
