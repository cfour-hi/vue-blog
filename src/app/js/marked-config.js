import marked from 'marked'
import hljs from 'hljs'

const renderer = new marked.Renderer()
renderer.link = (href, title, text) => `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`

marked.setOptions({
  renderer,
  highlight (code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})
