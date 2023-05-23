
#Features
Support draw QR code from data bank ( accountName, amount, memo,....) with many templates

# Installation
Npm install:

```
npm install node-vietqr
```
# Use
```js
import { generateQRCode } from 'node-vietqr'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

generateQRCode(
  {
    bankCode: '970418',
    bankAccountNumber: '12345678999',
    amount: 1000000,
    description: 'Thanh toan hoa don',
  },
  {
    width: 400,
    height: 400,
    padding: 16,
    bgColor: '#111729',
    qrColor: '#ffffff',
    output: path.join(__dirname, './qrcode.png'),
  }
)
```
# PaymentInfoConfig
| Property          | Type                | Default Value | Description                                                                                                                                                                                                                                                                                                                           | Example            |
|-------------------|---------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| bankCode          | `string`              |               | Bank Identification Numbers. [List bank code](https://www.sbv.gov.vn/webcenter/portal/en/home/sbv/paytreasury/bankidno?_afrLoop=20805074303692023#%40%3F_afrLoop%3D20805074303692023%26centerWidth%3D80%2525%26leftWidth%3D20%2525%26rightWidth%3D0%2525%26showFooter%3Dfalse%26showHeader%3Dfalse%26_adf.ctrl-state%3Dowj3utqdk_4) | Sacombank - `970403` |
| bankAccountNumber | `string`             |               | Bank account number                                                                                                                                                                                                                                                                                                                   |                    |
| amount            | `number`\|`undefined`   | `undefined`     | Transaction amount                                                                                                                                                                                                                                                                                                                    |                    |
| description       | `string`\|`undefined`  | `undefined`     | Transaction content                                                                                                                                                                                                                                                                                                                   |                    |
| qrMethod          | 'static'\|'dynamic' | 'static'      | `static`: Static QR – apply when allows a QR code to process more than one transaction.<br/> `dynamic`: Dynamic QR – apply when allow a QR code to process only one transaction.                                                                                                                                                      |                    |

# Option
| Property     | Type                  | Default Value | Description                                      | Example |
|--------------|-----------------------|---------------|--------------------------------------------------|---------|
| width        | `number`              | `400`         | Width of QRCode image                            |         |
| height       | `number`              | `400`         | Height of QRCode image                           |         |
| padding      | `number`              | `16`          | Padding of QRCode image                          |         |
| bgColor      | `string`              | `#111729`     | Background color                                 |         |
| qrColor      | `string`              | `#ffffff`     | QRcode color                                     |         |
| textColor    | `string`\|`undefined` |               | Text color                                       |         |
| textPosition | `number`\|`undefined` |               | Text position in QRcode image                    |         |
| textSize     | `number`\|`undefined` |               | Text size                                        |         |
| textValue    | `string`\|`undefined` |               | Text value                                       |         |
| fontFamily   | `string`\|`undefined` |               | Font family                                      |         |
| logoPath     | `string`\|`undefined` |               | Logo file path will show in the center of QRcode |         |
| logoWidth    | `number`\|`undefined` |               | Logo width                                       |         |
| output       | `string`\|`undefined` |               | QRcode file path output                          |         |
