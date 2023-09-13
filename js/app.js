/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByTagName('section');
let activeSectionID = null;

/**
 * End Global Variables
*/


/**
 * This function creates an array with the sections of the page.
 * @returns an array of objects with the sections
 */

function createSectionsArr() {
    const sectionsArr = [];

    const sections = document.getElementsByTagName("section");
    Array.from(sections).forEach((element) =>{
        const sectionID = element.id
        const sectionName = element.dataset.nav;
        sectionsArr.push({'name':sectionName, 'id':sectionID});
    })
    return sectionsArr;
}

/**
 * Create the navbar with the links and the anchors based on the section id
 */

window.addEventListener('load', createNavBar());
function createNavBar() {
    const sectionsArray = createSectionsArr();
    const navBar = document.getElementById("navbar__list");
    sectionsArray.forEach((section) => {
        const sectionID = section.id;
        const sectionName = section.name;
        const newLi = document.createElement("li");
        const liName = document.createTextNode(sectionName);
        newLi.setAttribute("id", `li__${sectionID}`);
        newLi.classList.add("nav__item");
        const newLink = document.createElement("a");
        newLink.appendChild(liName);
        newLink.setAttribute("id", `a__${sectionID}`);
        newLink.setAttribute("class", 'menu__link');
        newLink.setAttribute("href", `#${sectionID}`);
        newLi.appendChild(newLink);
        navBar.appendChild(newLi);
    })
}
 
/**
 * This function add the active-class atribute to the section when the user clicks an anchor
 */

window.addEventListener('hashchange',(event)=>{
    const newSectionID = event.newURL.slice(event.newURL.indexOf('#') + 1);
    const oldSectionID = event.oldURL.slice(event.oldURL.indexOf('#') + 1);
    const newSection = document.getElementById(newSectionID);
    newSection.classList.add("active-class");
    activeSectionID = newSectionID;
    const oldSection = document.getElementById(oldSectionID);
    oldSection.classList.remove("active-class");
    activeAnchor()
});


/**
 * Evaluates if an element is actually in viewport
 * @returns the bounding of an element 
 */

let isInViewport = function(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight))
};


/**
 * With the following function while the user scrolls we check which section is actually on the viewport to define it as active
 */

window.addEventListener('scroll', () => {
    const activeSectionIDtions = document.getElementsByClassName('active-class');
    
    for (activeSectionIDtion of activeSectionIDtions){
        activeSectionIDtion.classList.remove('active-class');
    }

    for (section of sections){
        if (isInViewport(section)){
            section.classList.add('active-class') // Add class 'active' to section when near top of viewport
            activeSectionID = section.id;
            activeAnchor()
        }
    }
})


/**
 * Check if the user is scrolling to hide the nav bar
 */

let prevScrollpos = window.scrollY;

window.onscroll = function() {
    let currentScrollPos = window.scrollY;
    const navbarCont = document.getElementById("header__container");
    if (prevScrollpos > currentScrollPos) {
        navbarCont.style.top = "0";
    } else {
        navbarCont.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

const hamburger = document.querySelector(".hamburger__menu");
const navMenu = document.querySelector(".nav__menu");
const navLink = document.querySelectorAll(".nav__item");

hamburger.addEventListener("click", mobileMenu);

/**
 * Convert the nav bar to a hamburguer menu when the page is being accessed in a mobile device
 */

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


/**
 * Close the hamburguer menu once the user clicks the section it wants to go to
 */

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/**
 * Add the active class to the anchor of the section that has the class active to highlight it in the navbar
 */

function activeAnchor() {
    const anchors = document.getElementsByClassName("menu__link")
    for (anchor of anchors) {
        anchor.classList.remove("active__anchor");
        if(anchor.id.slice(3) === activeSectionID) {
            anchor.classList.toggle("active__anchor")
        }
    }
}