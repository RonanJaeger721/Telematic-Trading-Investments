const header = document.querySelector(".site-header");
const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-links");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const animated = [
  ...document.querySelectorAll(".reveal,.reveal-down,.image-reveal,.stagger>*"),
];
const onScroll = () => {
  header.classList.toggle("scrolled", scrollY > 45);
  if (!reduce)
    animated.forEach((el) =>
      el.classList.toggle("soft-out", el.getBoundingClientRect().bottom < 55),
    );
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
if (reduce) animated.forEach((el) => el.classList.add("in-view"));
else {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.remove("soft-out");
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -4%" },
  );
  animated.forEach((el) => observer.observe(el));
}
const sections = [...document.querySelectorAll("section[id],header[id]")];
const links = [...document.querySelectorAll(".nav-links [data-section]")];
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) =>
          link.classList.toggle(
            "active",
            link.dataset.section === entry.target.id,
          ),
        );
      }
    }),
  { rootMargin: "-25% 0px -65%" },
);
sections.forEach((section) => sectionObserver.observe(section));
document.querySelectorAll("[data-compare]").forEach((compare) => {
  const input = compare.querySelector("input");
  input.addEventListener("input", () =>
    compare.style.setProperty("--position", `${input.value}%`),
  );
});
