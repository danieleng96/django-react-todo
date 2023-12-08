import './Rectangles.css';
import  { useEffect }  from "react";


export default function Rect() {
  useEffect(() => {
    const gallery = document.getElementById("gallery");
    // const footer = document.getElementById("footer");
    
    const hoverElement = document.getElementById("hover-element")

    

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const xDecimal = mouseX / window.innerWidth;
      const yDecimal = mouseY / window.innerHeight;

      const maxX = gallery.offsetWidth - window.innerWidth;
      const maxY = gallery.offsetHeight - window.innerHeight;

      const panX = maxX * xDecimal * -1;
      const panY = maxY * yDecimal * -1;

      const r = 255-Math.round(yDecimal * 255);
      const g = Math.round(window.scrollY/25);
      const b = 130-Math.round(xDecimal * 255/2);

      const rgbValue = `rgb(${r}, ${g}, ${b})`;

      gallery.style.backgroundColor = rgbValue;
      // gallery.style.setProperty("--color-transition", rgbValue);
    
      gallery.style.transform = `translate(${panX}px, ${panY}px)`

      const shapes = gallery.getElementsByClassName("shape");

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        

        const shapeRect = shape.getBoundingClientRect();
        const shapeCenterX = shapeRect.left + shapeRect.width / 2;
        const shapeCenterY = shapeRect.top + shapeRect.height / 2;

        const distanceX = shapeCenterX - mouseX;
        const distanceY = shapeCenterY - mouseY;
        const dis = Math.sqrt(distanceX**2 +distanceY**2);
        const range = (shapeRect.width*1.25);

        if (dis < range)
        {        
          const translationX = -distanceX/2;
          const translationY = -distanceY/2;

          shape.style.transform = `translate(${translationX}px, ${translationY}px)`;
          shape.style.transition = "0.5s ease"; // Set the transition properties

          if (!shape.dataset.originalBgColor) {
            shape.dataset.originalBgColor = window.getComputedStyle(shape).backgroundColor;
          }

          shape.style.backgroundColor = "yellow"; // Temporary background color

        } else {
          shape.style.transform = ""; // Reset the translation if outside the maximum distance
          shape.style.transition = "0.9s ease"; // Set the transition properties

          if (shape.dataset.originalBgColor) {
            shape.style.backgroundColor = shape.dataset.originalBgColor; // Restore original background color
            delete shape.dataset.originalBgColor;
          }
        }
      }
    };

    const handleTransitionEnd = (e) => {
      const shape = e.target;
      shape.style.transition = ""; // Remove the transition after it's completed
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('transitionend', handleTransitionEnd);


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('transitionend', handleTransitionEnd);

    };
  }, []); // Empty dependency array to run the effect only once

  return (
  <>  
    {/* <div className = "anchor">Screen Anchor</div> */}
    <div className="gallery" id="gallery">
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      {/* <div className="gallery-anchor">Gallery anchor</div> */}

    </div>
  </>
  );
};