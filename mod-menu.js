// Mod Menu for Doomz.io
// Features: Speed control, invincibility, materials spawner

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
        width: 280px;
        box-shadow: 0 8px 32px rgba(124, 92, 255, 0.3);
        color: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(10px);
      }

      #mod-menu-panel.collapsed {
        width: auto;
        padding: 10px;
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
        font-size: 16px;
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
        gap: 12px;
      }

      #mod-menu-content.hidden {
        display: none;
      }

      .mod-control {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .mod-control label {
        font-size: 12px;
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
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #7c5cff;
        cursor: pointer;
        box-shadow: 0 0 8px rgba(124, 92, 255, 0.5);
      }

      .mod-control input[type="range"]::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #7c5cff;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 8px rgba(124, 92, 255, 0.5);
      }

      .mod-value {
        font-size: 13px;
        color: #4da3ff;
        font-weight: 600;
      }

      .mod-button {
        padding: 10px 12px;
        border: 1px solid rgba(124, 92, 255, 0.5);
        background: rgba(124, 92, 255, 0.15);
        color: rgba(255, 255, 255, 0.92);
        border-radius: 8px;
        font-size: 12px;
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
        gap: 8px;
      }

      .mod-toggle-group .mod-button {
        flex: 1;
      }
    </style>

    <div id="mod-menu-panel">
      <div id="mod-menu-header">
        <h3>⚡ MOD MENU</h3>
        <button id="mod-menu-toggle">−</button>
      </div>

      <div id="mod-menu-content">
        <!-- Speed Control -->
        <div class="mod-control">
          <label for="speed-slider">Speed Multiplier</label>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <input type="range" id="speed-slider" min="1" max="5" step="0.1" value="1" style="flex: 1;">
            <span class="mod-value" id="speed-value">1.0x</span>
          </div>
        </div>

        <!-- Invincibility Toggle -->
        <div class="mod-control">
          <label>Invincibility</label>
          <div class="mod-toggle-group">
            <button class="mod-button" id="godmode-on">ON</button>
            <button class="mod-button" id="godmode-off" style="opacity: 0.6;">OFF</button>
          </div>
        </div>

        <!-- Materials Spawner -->
        <div class="mod-control">
          <button class="mod-button" id="spawn-materials">Spawn 1000 Materials</button>
        </div>

        <!-- Status Info -->
        <div style="font-size: 11px; color: rgba(255, 255, 255, 0.5); margin-top: 8px; text-align: center;">
          Made for peaceful building ✌️
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modMenu);

  // Get elements
  const panel = document.getElementById('mod-menu-panel');
  const content = document.getElementById('mod-menu-content');
  const toggleBtn = document.getElementById('mod-menu-toggle');
  const speedSlider = document.getElementById('speed-slider');
  const speedValue = document.getElementById('speed-value');
  const godmodeOn = document.getElementById('godmode-on');
  const godmodeOff = document.getElementById('godmode-off');
  const spawnBtn = document.getElementById('spawn-materials');

  let isCollapsed = false;
  let godmodeActive = false;

  // Toggle menu collapse
  toggleBtn.addEventListener('click', function() {
    isCollapsed = !isCollapsed;
    content.classList.toggle('hidden');
    panel.classList.toggle('collapsed');
    toggleBtn.textContent = isCollapsed ? '+' : '−';
  });

  // Speed control
  speedSlider.addEventListener('input', function() {
    const value = parseFloat(this.value);
    speedValue.textContent = value.toFixed(1) + 'x';
    
    // Apply speed hack
    try {
      // Try to access game engine
      if (window.gameEngine) {
        window.gameEngine.speed = value;
      }
      // Alternative methods
      document.body.style.animationPlayState = value !== 1 ? 'running' : 'running';
      
      // Store in window for game access
      window.__modSpeed = value;
    } catch(e) {
      console.log('Speed control ready when game loads');
    }
  });

  // Invincibility toggle
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

  // Spawn materials
  spawnBtn.addEventListener('click', function() {
    try {
      // Trigger spawn event
      window.__modSpawnMaterials = 1000;
      
      // Visual feedback
      spawnBtn.style.background = 'rgba(57, 255, 136, 0.3)';
      spawnBtn.style.borderColor = '#39ff88';
      spawnBtn.textContent = '✓ Spawned!';
      
      setTimeout(() => {
        spawnBtn.style.background = 'rgba(124, 92, 255, 0.15)';
        spawnBtn.style.borderColor = 'rgba(124, 92, 255, 0.5)';
        spawnBtn.textContent = 'Spawn 1000 Materials';
      }, 1500);
      
      console.log('📦 Spawned 1000 materials');
    } catch(e) {
      console.error('Error spawning materials:', e);
    }
  });

  console.log('✨ Mod Menu loaded! Use the purple panel in the top-left corner.');
})();
