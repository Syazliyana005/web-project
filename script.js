document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SECTION REVEAL ON SCROLL
    =============================== */
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            const trigger = window.innerHeight - 100;
            if (top < trigger) {
                sec.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();


    /* ===============================
       COUNTDOWN TIMER
    =============================== */
    const targetDate = new Date("2026-06-16T00:00:00").getTime();
    let prevDays = 0, prevHours = 0, prevMinutes = 0, prevSeconds = 0;

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.body.innerHTML = "<h1>Countdown Complete!</h1>";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (days !== prevDays) flipCard("days", days), prevDays = days;
        if (hours !== prevHours) flipCard("hours", hours), prevHours = hours;
        if (minutes !== prevMinutes) flipCard("minutes", minutes), prevMinutes = minutes;
        if (seconds !== prevSeconds) flipCard("seconds", seconds), prevSeconds = seconds;
    }

    function flipCard(unit, newValue) {
        const card = document.getElementById(unit + "-card");
        const front = document.getElementById(unit + "-front");
        const back = document.getElementById(unit + "-back");

        if (!card) return;

        back.textContent = newValue;
        card.classList.add("flipped");

        setTimeout(() => {
            front.textContent = newValue;
            card.classList.remove("flipped");
        }, 300);
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    /* ===============================
       CAROUSEL
    =============================== */
    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".card");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    const captionDiv = document.querySelector(".carousel-caption");

    const captions = [
        "This photo was taken on my 4th birthday, on 16 June 2008.",
        "This photo was taken on my final SPM examination day, marking my official last day as a high school student.",
        "This photo was taken during the Hari Raya Aidilfitri celebration in 2023.",
        "First year at UiTM Kedah, Semester 2 (October 2023).",
        "Second year at UiTM Kedah, Semester 3 (January 2025).",
        "My siblings and I. I am the youngest among us.",
        "Pre-convocation photoshoot with my family for my brother, November 2025.",
        "2025 Raya Celebration"
    ];

    function updateCarousel() {
        cards.forEach((card, index) => {
            const distance = index - current;
            const moveX = distance * 260;
            const scale = 1 - Math.min(Math.abs(distance) * 0.15, 0.3);
            const opacity = 1 - Math.min(Math.abs(distance) * 0.3, 0.5);

            card.style.transform = `translateX(${moveX}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = 100 - Math.abs(distance);
            card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        });

        prevArrow.style.opacity = current === 0 ? "0.3" : "1";
        prevArrow.style.pointerEvents = current === 0 ? "none" : "auto";

        nextArrow.style.opacity = current === cards.length - 1 ? "0.3" : "1";
        nextArrow.style.pointerEvents = current === cards.length - 1 ? "none" : "auto";

        if (captionDiv) captionDiv.textContent = captions[current];
    }

    function goNext() {
        if (current < cards.length - 1) {
            current++;
            updateCarousel();
        }
    }

    function goPrev() {
        if (current > 0) {
            current--;
            updateCarousel();
        }
    }

    prevArrow?.addEventListener("click", e => {
        e.stopPropagation();
        goPrev();
    });

    nextArrow?.addEventListener("click", e => {
        e.stopPropagation();
        goNext();
    });

    updateCarousel();
});
