const path = require('path')
const QRcode = require('../lib')

QRcode.generateQRCode(
  {
    bankCode: '970418',
    bankAccountNumber: '12345678999',
    amount: 1000000,
    description: 'Thanh toan hoa don',
  },
  {
    width: 400,
    height: 500,
    padding: 16,
    bgColor: '#111729',
    qrColor: '#ffffff',
    textValue: 'Hello world',
    textColor: '#CC0066',
    textSize: 16,
    textPosition: 416,
    logoPath: path.join(__dirname, 'logo.png'),
    logoWidth: 120,
    output: path.join(__dirname, './qrcode.png')
  },
)
