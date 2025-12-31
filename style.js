window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");

  // Add slide-out animation
  loader.classList.add("slide-out");

  // Wait for animation to finish before hiding loader and showing content
  setTimeout(() => {
    loader.style.display = "none";
    mainContent.style.display = "block";
  }, 3000); // match CSS transition duration
});


document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("smooth-content");
  let scrollY = 0;
  let targetY = 0;
  const speed = 0.07;

  function setBodyHeight() {
    document.body.style.height = content.scrollHeight + "px";
  }

  const resizeObserver = new ResizeObserver(setBodyHeight);
  resizeObserver.observe(content);

  function smoothScroll() {
    targetY = window.scrollY;
    scrollY += (targetY - scrollY) * speed;
    content.style.transform = `translateY(${-scrollY}px)`;
    requestAnimationFrame(smoothScroll);
  }

  window.addEventListener("resize", setBodyHeight);
  setBodyHeight();
  smoothScroll();
});

const navbar = document.querySelector(".navbar");
document.querySelector("#menu").onclick = () => {
  navbar.classList.toggle('activenav');
}

const closebtn = document.getElementById('close');
closebtn.addEventListener('click', () => {
  navbar.classList.remove('activenav');
});


window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});


const slider = document.querySelector('.slider-track');

slider.addEventListener('mouseenter', () => {
  slider.style.animationPlayState = 'paused';
});

slider.addEventListener('mouseleave', () => {
  slider.style.animationPlayState = 'running';
});

window.addEventListener("load", () => {

  gsap.registerPlugin(ScrollTrigger);

  const items = document.querySelectorAll(".service-item");
  const image = document.getElementById("serviceImage");
  const title = document.getElementById("serviceTitle");
  const desc = document.getElementById("serviceDesc");

  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 60%",

      onEnter: () => updateService(item),
      onEnterBack: () => updateService(item)
    });
  });

  function updateService(item) {
    items.forEach(i => i.classList.remove("activeservice"));
    item.classList.add("activeservice");

    image.style.opacity = 0;

    setTimeout(() => {
      image.src = item.dataset.img;
      title.textContent = item.dataset.title;
      desc.innerHTML = item.dataset.desc.replace(/\n/g, "<br>");
      image.style.opacity = 1;
    }, 150);
  }

});

function animateCounter(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTime = null;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start) + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = [
    { id: 'counter1', start: 0, end: 100, duration: 2000 },
    { id: 'counter2', start: 0, end: 100, duration: 2000 },
    { id: 'counter3', start: 0, end: 5, duration: 2000 }
  ];

  const counterSection = document.getElementById('counter-section');
  const options = {
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          animateCounter(counter.id, counter.start, counter.end, counter.duration);
        });
        observer.unobserve(counterSection); // Stop observing once the animation starts
      }
    });
  }, options);

  observer.observe(counterSection);
});



document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const icon = button.querySelector('.icon');

    // Toggle the current item
    faqItem.classList.toggle('active');

    // Update the icon
    if (faqItem.classList.contains('active')) {
      icon.textContent = '-';
    } else {
      icon.textContent = '+';
    }

    // Optional: Close other items when one is opened

    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== faqItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.icon').textContent = '+';
      }
    });
  });
});