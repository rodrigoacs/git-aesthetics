const mode = document.getElementById('mode')
const form = document.getElementById('form')
const preview = document.getElementById('preview')
const repository = document.getElementById('repository')
const copyButton = document.getElementById('copy-url')
let generatedUrl = ''

copyButton.addEventListener('click', e => copyToClipboard(e))

function copyToClipboard(e) {
  e.preventDefault()
  navigator.clipboard.writeText(generatedUrl)
  copyButton.innerText = 'copied!'
  setTimeout(() => {
    copyButton.innerText = 'copy url'
  }, 2000)
}

function getFormData() {
  const formData = new FormData(form)
  return Object.fromEntries(formData)
}

function processFormData(data) {
  return {
    ...data,
    hide_border: data.hide_border === 'on',
    bg_color: data.transparent_bg === 'on' ? '00000000' : data.bg_color.replace('#', ''),
    text_color: data.text_color.replace('#', ''),
    title_color: data.title_color.replace('#', ''),
    icon_color: data.icon_color.replace('#', ''),
    show_icons: data.show_icons === 'on',
    repo: data.repository || null,
  }
}

function buildURL(data, isRepoMode) {
  const baseUrl = 'https://github-readme-stats.vercel.app/api'
  const path = isRepoMode ? '/pin' : ''
  const queryParams = new URLSearchParams(data).toString()
  return `${baseUrl}${path}?${queryParams}`
}

function fetchDataAndDisplay(url) {
  preview.firstElementChild.style.display = 'block'
  let previewImg = document.getElementById('preview-img')
  previewImg.style.display = 'none'
  previewImg.src = url
  previewImg.onload = () => {
    preview.firstElementChild.style.display = 'none'
    previewImg.style.display = 'block'
    generatedUrl = url
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = processFormData(getFormData())
  const url = buildURL(data, mode.checked)
  fetchDataAndDisplay(url)
})

mode.addEventListener('click', e => {
  const isRepoMode = e.target.checked
  repository.disabled = !isRepoMode
  repository.required = isRepoMode
  if (!isRepoMode) repository.value = ''
})
