import path from 'path'
import fs from 'fs'
import parse from 'csv-parse/lib/sync'


export function CSVFile() {
  let datapath = path.resolve(__dirname, '../../data/jan-bletchley-10.csv')
  let csvfile = fs.readFileSync(datapath, "utf8");
  return csvfile
}

export function Bletchley10Index() {
  let rows = parse(CSVFile(),{})
  let dateNow = new Date()
  let index = {name:rows[0][2], members:[], year: dateNow.getFullYear(), month: dateNow.getMonth()}
  return index
}
