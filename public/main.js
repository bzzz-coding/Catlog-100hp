const toggle = document.querySelector('#theme-toggle')
const html = document.querySelector('html')


toggle.addEventListener('click', function() {
  let dataTheme = html.getAttribute('data-theme')
  console.log(`clicked! previous theme: dataTheme`);
  (dataTheme == 'night') ? html.setAttribute('data-theme', 'bumblebee') : html.setAttribute('data-theme', 'night')
  console.log(`theme changed to ${html.getAttribute('data-theme')}`)
})


// If 'urgent' is selected, toggle .hide class for needsHomeby input
const urgent = document.querySelector('#urgent')


urgent.addEventListener('change', function () {
  const datePicker = document.querySelector('.need-home-by')
  if (urgent.value == 'Yes') {
    datePicker.classList.remove("no-display")
  } else {
    datePicker.classList.add('no-display')
  }
})