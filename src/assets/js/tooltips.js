var tooltips = document.querySelectorAll(".todos-los-tooltips .etiqueta");
var fullDiv = document.querySelector("section");
var container = document.querySelector(".contener");
let timeoutId;
window.addEventListener("resize", contentPosition);
window.addEventListener("DOMContentLoaded", contentPosition);

function contentPosition() {
    tooltips.forEach((tooltip) => {
        var pin = tooltip.querySelector(".pin");
        var content = tooltip.querySelector(".tooltip-contenido");
        var arrow = tooltip.querySelector(".arrow");
        var pinLeft = pin.offsetLeft;
        if (pinLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
            var extraLeft =
                fullDiv.offsetWidth - (pinLeft + content.offsetWidth / 2);
            // console.log('right-conflict', tooltip)
            content.style.left =
                pinLeft - content.offsetWidth / 2 + extraLeft - 30 + "px";
            content.style.top = pin.offsetTop + 30 + "px";
        } else if (
            pin.offsetLeft + container.offsetLeft <
            content.offsetWidth / 2
        ) {
            // console.log('left conflict', pin.offsetLeft)
            content.style.left = -container.offsetLeft + "px";
            content.style.top = pin.offsetTop + 30 + "px";
        } else {
            content.style.left = pinLeft - content.offsetWidth / 2 + "px";
            content.style.top = pin.offsetTop + 30 + "px";
        }
        arrow.style.left =
            pinLeft - content.offsetLeft + pin.offsetWidth / 2 + "px";
    });
}
tooltips.forEach((tooltip) => {
    var pin = tooltip.querySelector(".pin");
    var content = tooltip.querySelector(".tooltip-contenido");
    pin.addEventListener("mouseover", () => {
        tooltip.classList.add("active");
    });
    pin.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
            if (!tooltip.classList.contains("content-hover")) {
                tooltip.classList.remove("active");
            }
        }, 2000);
    });
    content.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        tooltip.classList.add("active");
        tooltip.classList.add("content-hover");
    });
    content.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
            tooltip.classList.remove("active");
            tooltip.classList.remove("content-hover");
        }, 2000);
    });
});

// *********************
// This Code is for only the floating card in right bottom corner
// **********************

var WebCifarIcon = document.querySelector("#webCifar-icon");
var WebCifarEl = document.querySelector("#webCifar");
var close = WebCifarEl.querySelector(".close");
var youtubeLink = document.querySelector(".youtubeLink");

WebCifarIcon.addEventListener("click", () => {
    WebCifarEl.classList.add("active");
});
close.addEventListener("click", () => {
    WebCifarEl.classList.remove("active");
});