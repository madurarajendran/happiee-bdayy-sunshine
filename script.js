// countdown.js

const countdownDate = new Date('2026-03-16T15:02:31Z').getTime();

// Update the countdown every 1 second
const countdownFunction = setInterval(function() {
    // Get current date and time
    const now = new Date().getTime();
    // Find the distance between now and the countdown date
    const distance = countdownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="countdown"
    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById('countdown').innerHTML = 'EXPIRED';
        // Trigger confetti
        startConfetti();
        // Play music
        playMusic();
    }
}, 1000);

function startConfetti() {
    // Function for confetti animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Confetti animation logic here
    const colors = ['#FFC700', '#FF0000', '#00FF00', '#0000FF', '#FF00FF'];
    const particles = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
        });
    }

    // Draw function
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

function playMusic() {
    const audio = new Audio('path_to_your_audio_file.mp3');
    audio.play();
}
