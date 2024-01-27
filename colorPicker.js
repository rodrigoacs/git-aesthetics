let colorPickers = document.querySelectorAll('input[type="color"]')
colorPickers.forEach(picker => {
  picker.addEventListener('input', e => {
    const { value } = e.target

    e.target.previousElementSibling.value = value.split('#')[1]
  })
})

let colorCodes = document.querySelectorAll('.color_code')
colorCodes.forEach(code => {
  code.addEventListener('input', e => {
    const { value } = e.target

    if (value.length === 6) {
      return e.target.nextElementSibling.value = '#' + value
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  colorCodes.forEach(code => code.value = 'ffffff')
})
