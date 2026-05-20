// Enhanced Mod Menu for Doomz.io
// Features: Speed, Invincibility, Materials, Teleport, Infinite Build, Infinite Money, and more!

(function() {
  // Create mod menu container
  const modMenu = document.createElement('div');
  modMenu.id = 'mod-menu-container';
  modMenu.innerHTML = `
    <style>
      #mod-menu-container {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 10000;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }

      #mod-menu-panel {
        background: rgba(18, 16, 30, 0.95);
        border: 2px solid #7c5cff;
        border-radius: 12px;
        padding: 15px;
        width: 300px;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(124, 92, 255, 0.3);
        color: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(10px);
      }

      #mod-menu-panel.collapsed {
        width: auto;
        padding: 10px;
        max-height: none;
      }

      #mod-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      #mod-menu-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: #7c5cff;
      }

      #mod-menu-toggle {
        background: none;
        border: none;
        color: #7c5cff;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #mod-menu-toggle:hover {
        color: #4da3ff;
      }

      #mod-menu-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      #mod-menu-content.hidden {
        display: none;
      }

      .mod-section {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 10px;
        margin-top: 5px;
      }

      .mod-section:first-child {
        border-top: none;
        padding-top: 0;
        margin-top: 0;
      }

      .mod-section-title {
        font-size: 11px;
        color: rgba(124, 92, 255, 0.8);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
      }

      .mod-control {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .mod-control label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .mod-control input[type="range"] {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.1);
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .mod-control input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #7c5cff;
        cursor: pointer;
        box-shadow: 0 0 8px rgba(124, 92, 255, 0.5);
      }

      .mod-control input[type="range"]::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #7c5cff;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 8px rgba(124, 92, 255, 0.5);
      }

      .mod-value {
        font-size: 12px;
        color: #4da3ff;
        font-weight: 600;
      }

      .mod-button {
        padding: 9px 11px;
        border: 1px solid rgba(124, 92, 255, 0.5);
        background: rgba(124, 92, 255, 0.15);
        color: rgba(255, 255, 255, 0.92);
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .mod-button:hover {
        background: rgba(124, 92, 255, 0.3);
        border-color: #7c5cff;
        box-shadow: 0 0 12px rgba(124, 92, 255, 0.3);
      }

      .mod-button.active {
        background: rgba(124, 92, 255, 0.5);
        border-color: #7c5cff;
        box-shadow: 0 0 12px rgba(124, 92, 255, 0.5);
      }

      .mod-button:active {
        transform: scale(0.95);
      }

      .mod-toggle-group {
        display: flex;
        gap: 6px;
      }

      .mod-toggle-group .mod-button {
        flex: 1;
        padding: 7px 8px;
        font-size: 10px;
      }

      .mod-input {
        padding: 6px 8px;
        border: 1px solid rgba(124, 92, 255, 0.5);
        background: rgba(0, 0, 0, 0.3);
        color: rgba(255, 255, 255, 0.92);
        border-radius: 6px;
        font-size: 11px;
      }

      .mod-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      .mod-row {
        display: flex;
        gap: 6px;
      }

      .mod-row input {
        flex: 1;
      }

      .mod-row button {
        flex: 0.7;
      }

      .mod-status {
        font-size: 10px;
        color: #39ff88;
        margin-top: 4px;
        padding: 6px;
        background: rgba(57, 255, 136, 0.1);
        border-radius: 4px;
        border-left: 2px solid #39ff88;
      }
    </style>

    <div id="mod-menu-panel">
      <div id="mod-menu-header">
        <h3>⚡ MOD MENU v2</h3>
        <button id="mod-menu-toggle">−</button>
      </div>

      <div id="mod-menu-content">
        <!-- GAMEPLAY SECTION -->
        <div class="mod-section">
          <div class="mod-section-title">🎮 Gameplay</div>
          
          <div class="mod-control">
            <label for="speed-slider">Speed Multiplier</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <input type="range" id="speed-slider" min="1" max="5" step="0.1" value="1" style="flex: 1;">
              <span class="mod-value" id="speed-value">1.0x</span>
            </div>
          </div>

          <div class="mod-control">
            <label>Invincibility</label>
            <div class="mod-toggle-group">
              <button class="mod-button" id="godmode-on">ON</button>
              <button class="mod-button" id="godmode-off" style="opacity: 0.6;">OFF</button>
            </div>
          </div>
        </div>

        <!-- RESOURCES SECTION -->
        <div class="mod-section">
          <div class="mod-section-title">💰 Resources</div>
          
          <div class="mod-control">
            <button class="mod-button" id="spawn-materials">Spawn 1000 Materials</button>
          </div>

          <div class="mod-control">
            <label>Infinite Money</label>
            <div class="mod-toggle-group">
              <button class="mod-button" id="money-on">ON</button>
              <button class="mod-button" id="money-off" style="opacity: 0.6;">OFF</button>
            </div>
          </div>

          <div class="mod-control">
            <label>Infinite Build</label>
            <div class="mod-toggle-group">
              <button class="mod-button" id="build-on">ON</button>
              <button class="mod-button" id="build-off" style="opacity: 0.6;">OFF</button>
            </div>
          </div>
        </div>

        <!-- MOVEMENT SECTION -->
        <div class="mod-section">
          <div class="mod-section-title">📍 Movement</div>
          
          <div class="mod-control">
            <label>Teleport Coordinates</label>
            <div class="mod-row">
              <input type="number" id="teleport-x" class="mod-input" placeholder="X" value="0">
              <input type="number" id="teleport-y" class="mod-input" placeholder="Y" value="0">
            </div>
          </div>

          <div class="mod-control">
            <button class="mod-button" id="teleport-btn" style="width: 100%;">Teleport</button>
          </div>

          <div class="mod-control">
            <label>Auto-Run Speed</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <input type="range" id="auto-run-slider" min="1" max="3" step="0.1" value="1" style="flex: 1;">
              <span class="mod-value" id="auto-run-value">1.0x</span>
            </div>
            <div class="mod-toggle-group">
              <button class="mod-button" id="autorun-on">ON</button>
              <button class="mod-button" id="autorun-off" style="opacity: 0.6;">OFF</button>
            </div>
          </div>
        </div>

        <!-- CAMERA SECTION -->
        <div class="mod-section">
          <div class="mod-section-title">👀 Camera</div>
          
          <div class="mod-control">
            <label>Field of View</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <input type="range" id="fov-slider" min="30" max="120" step="5" value="60" style="flex: 1;">
              <span class="mod-value" id="fov-value">60°</span>
            </div>
          </div>

          <div class="mod-control">
            <label>No Fog</label>
            <div class="mod-toggle-group">
              <button class="mod-button" id="nofog-on">ON</button>
              <button class="mod-button" id="nofog-off" style="opacity: 0.6;">OFF</button>
            </div>
          </div>
        </div>

        <!-- INFO SECTION -->
        <div class="mod-section">
          <div class="mod-status">
            ✨ All features ready! Press K to toggle menu visibility
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modMenu);

  // Get all elements
  const panel = document.getElementById('mod-menu-panel');
  const content = document.getElementById('mod-menu-content');
  const toggleBtn = document.getElementById('mod-menu-toggle');
  
  // Gameplay
  const speedSlider = document.getElementById('speed-slider');
  const speedValue = document.getElementById('speed-value');
  const godmodeOn = document.getElementById('godmode-on');
  const godmodeOff = document.getElementById('godmode-off');
  
  // Resources
  const spawnBtn = document.getElementById('spawn-materials');
  const moneyOn = document.getElementById('money-on');
  const moneyOff = document.getElementById('money-off');
  const buildOn = document.getElementById('build-on');
  const buildOff = document.getElementById('build-off');
  
  // Movement
  const teleportX = document.getElementById('teleport-x');
  const teleportY = document.getElementById('teleport-y');
  const teleportBtn = document.getElementById('teleport-btn');
  const autorunOn = document.getElementById('autorun-on');
  const autorunOff = document.getElementById('autorun-off');
  const autorunSlider = document.getElementById('auto-run-slider');
  const autorunValue = document.getElementById('auto-run-value');
  
  // Camera
  const fovSlider = document.getElementById('fov-slider');
  const fovValue = document.getElementById('fov-value');
  const nofogOn = document.getElementById('nofog-on');
  const nofogOff = document.getElementById('nofog-off');

  let isCollapsed = false;
  let godmodeActive = false;
  let moneyActive = false;
  let buildActive = false;
  let autorunActive = false;
  let nofogActive = false;

  // Toggle menu collapse
  toggleBtn.addEventListener('click', function() {
    isCollapsed = !isCollapsed;
    content.classList.toggle('hidden');
    panel.classList.toggle('collapsed');
    toggleBtn.textContent = isCollapsed ? '+' : '−';
  });

  // Toggle with K key
  window.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'k') {
      toggleBtn.click();
    }
  });

  // ===== GAMEPLAY =====
  speedSlider.addEventListener('input', function() {
    const value = parseFloat(this.value);
    speedValue.textContent = value.toFixed(1) + 'x';
    window.__modSpeed = value;
  });

  godmodeOn.addEventListener('click', function() {
    godmodeActive = true;
    godmodeOn.classList.add('active');
    godmodeOff.classList.remove('active');
    godmodeOff.style.opacity = '0.6';
    window.__modGodmode = true;
    console.log('✅ Invincibility enabled');
  });

  godmodeOff.addEventListener('click', function() {
    godmodeActive = false;
    godmodeOn.classList.remove('active');
    godmodeOff.classList.add('active');
    godmodeOff.style.opacity = '1';
    window.__modGodmode = false;
    console.log('❌ Invincibility disabled');
  });

  // ===== RESOURCES =====
  spawnBtn.addEventListener('click', function() {
    window.__modSpawnMaterials = 1000;
    spawnBtn.style.background = 'rgba(57, 255, 136, 0.3)';
    spawnBtn.style.borderColor = '#39ff88';
    spawnBtn.textContent = '✓ Spawned!';
    setTimeout(() => {
      spawnBtn.style.background = 'rgba(124, 92, 255, 0.15)';
      spawnBtn.style.borderColor = 'rgba(124, 92, 255, 0.5)';
      spawnBtn.textContent = 'Spawn 1000 Materials';
    }, 1500);
    console.log('📦 Spawned 1000 materials');
  });

  moneyOn.addEventListener('click', function() {
    moneyActive = true;
    moneyOn.classList.add('active');
    moneyOff.classList.remove('active');
    moneyOff.style.opacity = '0.6';
    window.__modInfiniteMoney = true;
    console.log('💰 Infinite money enabled');
  });

  moneyOff.addEventListener('click', function() {
    moneyActive = false;
    moneyOn.classList.remove('active');
    moneyOff.classList.add('active');
    moneyOff.style.opacity = '1';
    window.__modInfiniteMoney = false;
    console.log('💰 Infinite money disabled');
  });

  buildOn.addEventListener('click', function() {
    buildActive = true;
    buildOn.classList.add('active');
    buildOff.classList.remove('active');
    buildOff.style.opacity = '0.6';
    window.__modInfiniteBuild = true;
    console.log('🏗️ Infinite build enabled');
  });

  buildOff.addEventListener('click', function() {
    buildActive = false;
    buildOn.classList.remove('active');
    buildOff.classList.add('active');
    buildOff.style.opacity = '1';
    window.__modInfiniteBuild = false;
    console.log('🏗️ Infinite build disabled');
  });

  // ===== MOVEMENT =====
  teleportBtn.addEventListener('click', function() {
    const x = parseFloat(teleportX.value);
    const y = parseFloat(teleportY.value);
    window.__modTeleport = { x, y };
    teleportBtn.style.background = 'rgba(77, 163, 255, 0.3)';
    teleportBtn.style.borderColor = '#4da3ff';
    teleportBtn.textContent = '✓ Teleporting...';
    setTimeout(() => {
      teleportBtn.style.background = 'rgba(124, 92, 255, 0.15)';
      teleportBtn.style.borderColor = 'rgba(124, 92, 255, 0.5)';
      teleportBtn.textContent = 'Teleport';
    }, 1500);
    console.log(`📍 Teleporting to (${x}, ${y})`);
  });

  autorunSlider.addEventListener('input', function() {
    const value = parseFloat(this.value);
    autorunValue.textContent = value.toFixed(1) + 'x';
    window.__modAutorunSpeed = value;
  });

  autorunOn.addEventListener('click', function() {
    autorunActive = true;
    autorunOn.classList.add('active');
    autorunOff.classList.remove('active');
    autorunOff.style.opacity = '0.6';
    window.__modAutorun = true;
    console.log('🏃 Auto-run enabled');
  });

  autorunOff.addEventListener('click', function() {
    autorunActive = false;
    autorunOn.classList.remove('active');
    autorunOff.classList.add('active');
    autorunOff.style.opacity = '1';
    window.__modAutorun = false;
    console.log('🏃 Auto-run disabled');
  });

  // ===== CAMERA =====
  fovSlider.addEventListener('input', function() {
    const value = parseFloat(this.value);
    fovValue.textContent = value + '°';
    window.__modFOV = value;
  });

  nofogOn.addEventListener('click', function() {
    nofogActive = true;
    nofogOn.classList.add('active');
    nofogOff.classList.remove('active');
    nofogOff.style.opacity = '0.6';
    window.__modNoFog = true;
    console.log('👀 No fog enabled');
  });

  nofogOff.addEventListener('click', function() {
    nofogActive = false;
    nofogOn.classList.remove('active');
    nofogOff.classList.add('active');
    nofogOff.style.opacity = '1';
    window.__modNoFog = false;
    console.log('👀 No fog disabled');
  });

  console.log('✨ Enhanced Mod Menu v2 loaded! Press K to toggle');
})();
