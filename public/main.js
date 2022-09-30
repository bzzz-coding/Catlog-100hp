// hamburger menu
const hamburgerBtn = document.getElementById('menu-btn')
const navMenu = document.getElementById('menu')

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('open')
  navMenu.classList.toggle('flex')
  navMenu.classList.toggle('hidden')
})



// theme toggle
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

if (urgent) {
  urgent.addEventListener('change', function () {
    const datePicker = document.querySelector('.need-home-by')
    if (urgent.value == 'Yes') {
      datePicker.classList.remove("no-display")
    } else {
      datePicker.classList.add('no-display')
    }
  });
}



// Click on Add New Catlog button to see form
const catlogBtn = document.querySelector('#add-catlog')

if (catlogBtn) {
  catlogBtn.addEventListener('click', () => {
    console.log('clicked')
    const catlogForm = document.querySelector('#catlog-form')
    catlogForm.classList.remove('no-display')
    catlogBtn.classList.add('no-display')
  })
}

const cancelBtn = document.querySelector('#cancel-addlog')

if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    console.log('clicked')
    const catlogForm = document.querySelector('#catlog-form')
    catlogForm.classList.add('no-display')
    catlogBtn.classList.remove('no-display')
  })
}
