document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.querySelector('.change-theme-button')
    const logoIMG = document.getElementById("logo")
    const darkModeStorage = localStorage.getItem('dark-mode')

    let isDarkMode = false

    darkModeButton.addEventListener('click', () => {
        isDarkMode = (isDarkMode) ? false : true
        changeTheme()
    })

    function changeTheme() {
        return (isDarkMode) ? turnOnDarkMode() : turnOffDarkMode()
    }

    const turnOnDarkMode = () => {
        document.documentElement.style.setProperty('--bg', 'var(--bg-dark)')
        document.documentElement.style.setProperty('--bg-card', 'var(--bg-card-dark)')
        document.documentElement.style.setProperty('--text', 'var(--text-dark)')
        document.body.classList.add("transition")
        localStorage.setItem('dark-mode', true)
        logoIMG.src = '/assets/img/Logo-Dark.png'
    }

    const turnOffDarkMode = () => {
        document.documentElement.style.setProperty('--bg', '#fff')
        document.documentElement.style.setProperty('--bg-card', '#fff')
        document.documentElement.style.setProperty('--text', '#313131')
        document.body.classList.add("transition")
        localStorage.removeItem('dark-mode')
        logoIMG.src = '/assets/img/Logo.png'
    }

    if (darkModeStorage) {
        turnOnDarkMode()
    }
})