const toggle = document.querySelector('#theme-toggle')
const html = document.querySelector('html')


// console.log(html.getAttribute('lang'))
// console.log(html.getAttribute('data-theme'))



toggle.addEventListener('click', function() {
  let dataTheme = html.getAttribute('data-theme')
  console.log(`clicked! previous theme: dataTheme`);
  (dataTheme == 'night') ? html.setAttribute('data-theme', 'bumblebee') : html.setAttribute('data-theme', 'night')
  console.log(`theme changed to ${html.getAttribute('data-theme')}`)
})