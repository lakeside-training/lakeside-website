// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** copy text
export const copyText = (text, alertMsg) => () => {
  const cb = navigator.clipboard
  cb.writeText(text).then(()=>{
    if(alertMsg) alert(alertMsg)
  })
}

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}
