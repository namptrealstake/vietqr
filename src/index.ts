import QRCode from 'qrcode'
import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import path from 'path'
import { crc16ccitt } from './crc16ccitt'

// Id: 00, length: 02, value: 01
const F_00 = '000201'

// Id of field 38
const F_38_ID = '38'

// Data of subfield 00 of field 38
const F_38_00 = '0010A000000727'

// ID of subfield 01 of field 38
const F_38_01_ID = '01'

// ID of subfield 01 of subfield 00 of field 38
const F_38_01_00_ID = '00'

// ID of subfield 01 of subfield 01 of field 38
const F_38_01_01_ID = '01'

// Data of subfield 02 of field 38
const F_38_02 = '0208QRIBFTTA'

function createField38(bnbId: string, bnbAccountNumber: string) {
  // Data of subfield 00 of subfield 01 of field 38
  const f_01_00 = getFieldData(F_38_01_00_ID, bnbId)

  // Data of subfield 01 of subfield 01 of field 38
  const f_01_01 = getFieldData(F_38_01_01_ID, bnbAccountNumber)

  // Data of subfield 01 of field 38
  const f_01 = getFieldData(F_38_01_ID, `${f_01_00}${f_01_01}`)

  const f_38 = `${F_38_00}${f_01}${F_38_02}`
  return getFieldData(F_38_ID, f_38)
}

function getLength(data: string) {
  if (data.length < 10) return `0${data.length}`
  return data.length.toString()
}

function getFieldData(id: string, data: string) {
  return `${id}${getLength(data)}${data}`
}

function createCRC(data: string) {
  return crc16ccitt(data).toString(16)
}

const F_53 = '5303704'
const F_54_ID = '54'
const F_58 = '5802VN'
const F_62 = '62'
const F_62_08_ID = '08'
const F_63 = '6304'

async function drawImage(data: string, option: Option) {
  const canvas = createCanvas(option.width, option.height) // create Canvas Instance
  const context = canvas.getContext('2d') // create context
  context.fillStyle = option.bgColor
  context.fillRect(0, 0, option.width, option.height)

  const qrCanvas = createCanvas(option.width - 2 * option.padding, option.width - 2 * option.padding)
  QRCode.toCanvas(qrCanvas, data, {
    width: option.width - 2 * option.padding,
    margin: 0,
    color: { dark: option.qrColor, light: option.bgColor },
  })

  context.drawImage(qrCanvas, option.padding, option.padding)
  if (option.textValue) {
    context.fillStyle = option.textColor || '#ffffff'
    context.font = `bold ${option.textSize}pt Menlo`
    const textAlign = context.measureText(option.textValue).width
    context.fillText(
      option.textValue,
      option.width / 2 - textAlign / 2 - option.padding,
      option.textPosition || option.height - option.padding,
    )
  }

  if (option.logoPath) {
    const logoWidth = option.logoWidth || 100
    const x = (option.width - logoWidth) / 2
    const logo = await loadImage(option.logoPath)
    const logoHeight = (logoWidth * logo.height) / logo.width
    context.drawImage(logo, x, x + (logoWidth - logoHeight) / 2, logoWidth, logoHeight)
  }

  const imageBuffer = canvas.toBuffer('image/png')
  fs.writeFileSync(option.output || path.join(__dirname, './qrcode.png'), imageBuffer)
}

type PaymentInfoConfig = {
  bankCode: string
  bankAccountNumber: string
  amount?: number
  description?: string
  qrMethod?: 'static' | 'dynamic'
}

type Option = {
  width: number
  height: number
  padding: number
  bgColor: string
  qrColor: string
  textColor?: string
  textPosition?: number
  textSize?: number
  textValue?: string
  fontFamily?: string
  logoPath?: string
  logoWidth?: number
  output?: string
}

export function generateQRCodeContent(info: PaymentInfoConfig) {
  const f01 = info.qrMethod === 'dynamic' ? '010212' : '010211'
  const f38 = createField38(info.bankCode, info.bankAccountNumber)
  let f54 = ''
  if (info.amount) {
    f54 = getFieldData(F_54_ID, info.amount.toString())
  }

  let f62 = ''
  if (info.description) {
    const f62_08 = getFieldData(F_62_08_ID, info.description)
    f62 = getFieldData(F_62, f62_08)
  }

  const data = `${F_00}${f01}${f38}${F_53}${f54}${F_58}${f62}${F_63}`
  const crc = createCRC(data)
  return `${data}${crc}`
}

export function generateQRCode(
  info: PaymentInfoConfig,
  option: Option = {
    width: 400,
    height: 400,
    padding: 16,
    bgColor: '#111729',
    qrColor: '#ffffff',
  },
) {
  const content = generateQRCodeContent(info)
  drawImage(content, option)
}
