const themeBtn = document.querySelector('.material-symbols-outlined');
const themeStyle = document.getElementById('theme');


themeBtn.onclick = () => {
    if (themeBtn.textContent == 'light_mode') {
        themeStyle.innerHTML = "body {background-color: #2f353b;}"
        + "#calc {background-color: #505a64; border: 1px outset white;}"
        + "#calc-display-container {color: white; background-color: #41534a; border: 1px outset white;}"
        + ".calc-display::-webkit-scrollbar-thumb {background-color: #586e63;}"

        themeBtn.textContent = 'dark_mode';
    } else {
        themeStyle.innerHTML = "";
        themeBtn.textContent = 'light_mode';
    }
}