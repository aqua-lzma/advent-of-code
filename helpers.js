import { existsSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import axios from 'axios'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function getInput (year, day) {
  const path = join(__dirname, 'inputs', `${year}-${day}.txt`)
  if (existsSync(path)) return readFileSync(path, 'utf8')
  let cookie
  try {
    cookie = readFileSync('session-cookie.txt', 'utf8')
  } catch (e) {
    console.error(e)
    process.exit()
  }
  const url = `https://adventofcode.com/${year}/day/${day}/input`
  console.log('Fetching input . . .')
  let input
  try {
    input = await axios.get(url, {
      headers: {'Cookie': `session=${cookie}`}
    })
  } catch (e) {
    console.error(e)
    process.exit()
  }
  console.log('Success')
  input = input.data.trim()
  writeFileSync(path, input)
  return input
}

export function log (name, func, input, expected) {
  console.time(name)
  let out = func(...input)
  console.timeEnd(name)
  if (expected != null) {
    let assertion = (typeof expected === 'function')
      ? expected(out)
      : expected === out
    if (!assertion) console.warn('Expected:', expected)
  }
  out = String(out)
  if (out.length < 1000) console.warn(name, ':', out)
  else console.warn(name, ':', `${out.slice(0, 10)} <${out.length}> ${out.slice(-10)}`)
  console.log('---')
}
