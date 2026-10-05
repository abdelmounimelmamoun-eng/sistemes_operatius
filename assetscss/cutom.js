// Gestió de Finetres
let topZIndex = 100;

function openWindow(id) {
  const win = document.getElementById(id);
  const tbItem = document.getElementById('tb-' + id);
  if (win) {
    win.classList.remove('hidden', 'minimized');
    topZIndex++;
    win.style.zIndex = topZIndex;
    if (tbItem) {
      tbItem.classList.remove('hidden');
      tbItem.classList.add('active');
    }
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  const tbItem = document.getElementById('tb-' + id);
  if (win) {
    win.classList.add('hidden');
    if (tbItem) tbItem.classList.add('hidden');
  }
}

function minimizeWindow(id) {
  const win = document.getElementById(id);
  const tbItem = document.getElementById('tb-' + id);
  if (win) {
    win.classList.add('minimized');
    if (tbItem) tbItem.classList.remove('active');
  }
}

function maximizeWindow(id) {
  const win = document.getElementById(id);
  if (win.style.width === '100%') {
    win.style.width = '880px';
    win.style.height = '600px';
    win.style.top = '30px';
    win.style.left = '60px';
  } else {
    win.style.width = '100%';
    win.style.height = 'calc(100% - 40px)';
    win.style.top = '0';
    win.style.left = '0';
  }
}

function toggleWindowFromTaskbar(id) {
  const win = document.getElementById(id);
  if (win.classList.contains('hidden') || win.classList.contains('minimized')) {
    openWindow(id);
  } else {
    minimizeWindow(id);
  }
}

// Menú d'Inici
function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// Moviment drag & drop de les finestres
document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.window-header');

  win.addEventListener('mousedown', () => {
    topZIndex++;
    win.style.zIndex = topZIndex;
  });

  if (header) {
    header.addEventListener('mousedown', e => {
      if (e.target.tagName === 'BUTTON') return;
      let shiftX = e.clientX - win.getBoundingClientRect().left;
      let shiftY = e.clientY - win.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        win.style.left = pageX - shiftX + 'px';
        win.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
      };
    });
  }
});

// Terminal CLI interactiva
function handleTerminal(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('term-input');
    const body = document.getElementById('term-body');
    if (!input || !body) return;

    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    body.innerHTML += `<div><span class="cmd">user@cyber-sys:~$</span> ${input.value}</div>`;

    if (cmd === 'help') {
      body.innerHTML += `<div class="out">Ordres disponibles: <br> - <strong>sprints</strong>: Resum de continguts<br> - <strong>clear</strong>: Neteja la pantalla<br> - <strong>about</strong>: Informació de l'autor</div>`;
    } else if (cmd === 'sprints') {
      body.innerHTML += `<div class="out">Projecte 1 (Sprints 1-4) | Projecte 2 (Sprints 1-4)</div>`;
    } else if (cmd === 'about') {
      body.innerHTML += `<div class="out">Abdelmounim El Mamoun - Sistemes Informàtics</div>`;
    } else if (cmd === 'clear') {
      body.innerHTML = '';
    } else {
      body.innerHTML += `<div class="out" style="color: var(--red);">Ordre no reconeguda: '${cmd}'. Prova amb 'help'.</div>`;
    }

    input.value = '';
    body.scrollTop = body.scrollHeight;
  }
}

// Rellotge en temps real a la barra de tasques
function updateClock() {
  const clock = document.getElementById('taskbar-clock');
  if (clock) {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
setInterval(updateClock, 1000);
updateClock();
