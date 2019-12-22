import { stars, text } from './config.js'

const title = document.querySelector('#title')
const content = document.querySelector('#content')
const wrapper = document.querySelector('#wrapper')

const width = window.innerWidth
const height = window.innerHeight

const getTextContent = () => {
  title.innerHTML = text.title
  wrapper.innerHTML = text.content.reduce((p, c) => p + c , '')
}

const setCssProps = () => {
  title.style.fontSize = width / 35 + 'px';
  content.style.height = height + 'px';
  wrapper.style.fontSize = width / 25 + 'px';
}

const createCanvasElement = () => {

  const canvas = document.getElementById('snow')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  for (let i = 0; i < stars.amount; i++) {
    stars.refs[i] = {
      x: Math.ceil(Math.random() * width),
      y: Math.ceil(Math.random() * height),
      size: Math.random() * stars.size,
    }
  }

  context.clearRect(0, 0, width, height)

  for (let i = 0; i < stars.amount; i++) {
    const e = stars.refs[i]
    context.beginPath()
    context.fillStyle = '#FFFFFF'
    context.arc(e.x, e.y, e.size, 0, 2 * Math.PI)
    context.fill()
  }

}

(() => {

  getTextContent()
  setCssProps()
  createCanvasElement()

})()

document.getElementById('button')
  .addEventListener('click', () => {
    title.className = 'title title__animation'
    wrapper.className = 'wrapper wrapper__animation'
    content.className = 'content'
    document.querySelector('audio').play()
  })