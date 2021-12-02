import { promises as fs } from 'fs'
import { gzip } from 'zlib'
import { promisify } from 'util'
import buffer from 'buffer'
const gzipPromise = promisify(gzip)

const filename = process.argv[2]

async function main () {
  const data = await fs.readFile(filename)
  const gzippedData = await gzipPromise(data)
  await fs.writeFile(`${filename}.gz`, gzippedData)
  console.log('File successfully compressed')
}

// main()
console.log(buffer.constants.MAX_LENGTH);