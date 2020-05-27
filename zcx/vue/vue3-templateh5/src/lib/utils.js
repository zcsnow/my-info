const SCREEN_WIDTH = document.body.clientWidth
const SCREEN_HEIGHT=document.body.scrollHeight

function setTitle(title) {
  document.title = title
  var mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // iframe.setAttribute('src', '')
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}

var obj={
  SCREEN_WIDTH:SCREEN_WIDTH,
  SCREEN_HEIGHT:SCREEN_HEIGHT,
  setTitle:setTitle
}
export default obj;