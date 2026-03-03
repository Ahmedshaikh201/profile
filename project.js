const texts = ["Media Professional","Soft Skills Trainer","Leadership Coach"];
let count = 0;
let index = 0;

function type(){
    let word = texts[count];
    document.getElementById("text").textContent = word.slice(0, ++index);

    if(index === word.length){
        setTimeout(()=>{
            index = 0;
            count = (count + 1) % texts.length;
        },1500);
    }
    setTimeout(type,150);
}
type();

const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');

    if (hamburger.classList.contains('bi-list')) {
        hamburger.classList.replace('bi-list', 'bi-x');
    } else {
        hamburger.classList.replace('bi-x', 'bi-list');
    }
});
const counters = document.querySelectorAll(".num");

const runCounter = (counter) => {
    let start = parseInt(counter.getAttribute("data-start"));
    const end = parseInt(counter.getAttribute("data-target"));
    const speed = 8;

    counter.innerText = start;

    const updateCounter = () => {
        if (start < end) {
            start++;
            counter.innerText = start;
            setTimeout(updateCounter, speed);
        } else {
            counter.innerText = end;
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.5 
});

counters.forEach(counter => observer.observe(counter));

let skillsStarted = false;

function animateSkills() {
    const skillsSection = document.querySelector('.box4');
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100 && !skillsStarted) {
        skillsStarted = true;

        document.querySelectorAll('.skill').forEach(skill => {
            const fill = skill.querySelector('.fill');
            const percentText = skill.querySelector('.percent');
            const target = parseInt(fill.getAttribute('data-percent'));

            
            fill.style.width = target + "%";

        
            let count1 = 0;
            const speed = target / 40;

            const counter = setInterval(() => {
                count1 += speed;
                if (count1 >= target) {
                    count1 = target;
                    clearInterval(counter);
                }
                percentText.textContent = Math.round(count1) + "%";
            }, 30);
        });
    }
}

window.addEventListener("scroll", animateSkills);

document.querySelectorAll('.home').forEach(item => {
    item.addEventListener('click', () => {
        const link = item.querySelector('a');
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        sidebar.classList.remove('active');
        hamburger.classList.replace('bi-x', 'bi-list');
    });
});

const videos = document.querySelectorAll(".hover-video");

videos.forEach(video => {
    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
