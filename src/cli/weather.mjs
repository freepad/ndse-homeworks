#!/usr/bin/env node

import config from '../config.mjs'
import http from 'node:http'
const city = process.argv[2]
const url = `http://api.weatherstack.com/current?access_key=${config.WEATHERSTACK_API_KEY}&query=${city}`
http.get(url, (res) => {
  const {statusCode} = res
  if (statusCode !== 200) {
    console.log(`statusCode: ${statusCode}`)
    return
  }

  res.setEncoding('utf8')
  let rowData = ''
  res.on('data', (chunk) => rowData += chunk)
  res.on('end', () => {
    let parseData = JSON.parse(rowData)
    console.table(parseData.current)
  })
}).on('error', (err) => {
  console.error(err)
})

