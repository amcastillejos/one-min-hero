let timeLeft = 60;
    let score = 0;
    let timerInterval;
    let isMuted = false;

    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const log = document.getElementById('log');
    const game = document.getElementById('game');
    const startScreen = document.getElementById('startScreen');
    const restartButton = document.getElementById('restartButton');
    const muteButton = document.getElementById('muteButton');
    const bgMusic = document.getElementById('bg-music');

    const roomTypes = ['monster', 'treasure', 'trap', 'empty'];

    const sounds = {
      monster: document.getElementById('sound-monster'),
      treasure: document.getElementById('sound-treasure'),
      trap: document.getElementById('sound-trap'),
      empty: document.getElementById('sound-empty'),
      gameover: document.getElementById('sound-gameover'),
    };

    function playSound(type) {
      if (!isMuted && sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play();
      }
    }

    function startGame() {
      startScreen.style.display = 'none';
      game.style.display = 'block';
      timeLeft = 60;
      score = 0;
      timerDisplay.textContent = timeLeft;
      scoreDisplay.textContent = score;
      log.innerText = '';
      restartButton.style.display = 'none';
      timerInterval = setInterval(updateTimer, 1000);
      bgMusic.volume = 0.3;
      if (!isMuted) {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(e => {
          console.warn('Autoplay was blocked:', e);
        });
      }
    }

    function nextRoom() {
      const room = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      switch (room) {
        case 'monster':
          log.innerText = '💥 A wild monster appears! You defeat it and earn 20 points!';
          score += 20;
          playSound('monster');
          break;
        case 'treasure':
          log.innerText = '💰 You found a treasure chest! +10 points and +5 seconds!';
          score += 10;
          timeLeft += 5;
          playSound('treasure');
          break;
        case 'trap':
          log.innerText = '🕳️ It was a trap! You lose 5 seconds!';
          timeLeft -= 5;
          playSound('trap');
          break;
        case 'empty':
          log.innerText = '🚪 The room is empty... Move along!';
          playSound('empty');
          break;
      }
      scoreDisplay.textContent = score;
    }

    function updateTimer() {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.querySelector('.doors').innerHTML = '<strong>🛑 Game Over!</strong>';
        log.innerText = `🎯 Final Score: ${score}`;
        playSound('gameover');
        restartButton.style.display = 'inline-block';
        bgMusic.pause();
      }
    }

    function restartGame() {
      location.reload();
    }

    function toggleMute() {
      isMuted = !isMuted;
      if (isMuted) {
        bgMusic.pause();
        muteButton.textContent = '🔇 Unmute';
      } else {
        bgMusic.play().catch(e => {
          console.warn('Autoplay was blocked:', e);
        });
        muteButton.textContent = '🔊 Mute';
      }
    }

    window.onload = () => {
      startScreen.style.display = 'block';
      game.style.display = 'none';
    }