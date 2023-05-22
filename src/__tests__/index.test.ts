import rewire from 'rewire'

const QRCode = rewire('../../lib/index.js')

describe('getLength', () => {
  test('getLength return 05 with data = hello', () => {
    const getLength = QRCode.__get__('getLength')
    expect(getLength('hello')).toBe('05')
  })
  test('getLength return 36 with data = 387a69bb-8bb4-4bac-863c-215d4ed2bd8b', () => {
    const getLength = QRCode.__get__('getLength')
    expect(getLength('387a69bb-8bb4-4bac-863c-215d4ed2bd8b')).toBe('36')
  })
})

describe('getFieldData', () => {
  test('getFieldData return data include: [id][length][value]', () => {
    const getFieldData = QRCode.__get__('getFieldData')
    const id = '01'
    const data = '387a69bb-8bb4-4bac-863c-215d4ed2bd8b'
    const result = `${id}36${data}`
    expect(getFieldData(id, data)).toBe(result)
  })
})

describe('createField38', () => {
  test('createField38 return correct data', () => {
    const data = '0010A00000072701270006970403011300110123456780208QRIBFTTA'
    const id = '38'
    const length = '57'
    const result = `${id}${length}${data}`
    const createField38 = QRCode.__get__('createField38')
    expect(createField38('970403', '0011012345678')).toBe(result)
  })
})

describe('createCRC', () => {
  test('createCRC return correct data', () => {
    const template1 = '00020101021138600010A00000072701300006970403011697040311012345670208QRIBFTTC53037045802VN6304'
    const template2 = '00020101021138570010A00000072701270006970403011200110123456780208QRIBFTTA53037045802VN6304'
    const createCRC = QRCode.__get__('createCRC')
    expect(createCRC(template1)).toBe('4f52')
    expect(createCRC(template2)).toBe('f4e5')
  })
})

describe('generateQRCodeContent', () => {
  test('generateQRCodeContent generated correct data', () => {
    const result1 = '00020101021138570010A00000072701270006970403011300110123456780208QRIBFTTA53037045802VN63049e6f'
    const result2 =
      '00020101021138570010A00000072701270006970403011300110123456780208QRIBFTTA530370454061800005802VN62230819thanh toan don hang63043e60'
    const info1 = {
      bankCode: '970403',
      bankAccountNumber: '0011012345678',
    }

    const info2 = {
      bankCode: '970403',
      bankAccountNumber: '0011012345678',
      amount: '180000',
      description: 'thanh toan don hang',
    }
    const generateQRCodeContent = QRCode.__get__('generateQRCodeContent')
    expect(generateQRCodeContent(info1)).toBe(result1)
    expect(generateQRCodeContent(info2)).toBe(result2)
  })
})
