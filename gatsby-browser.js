export const onClientEntry = () => {
  document.documentElement.className =
    document.documentElement.className.replace(/(\bno-js\b|\bjb-yes-js\b)/g, '') + ' jb-yes-js js '

  import('lazysizes')
}
