import "./index.css";

import React, { useRef } from "react";

import { Particle } from "./particle";


function MouseTrail(): JSX.Element {

  const canvas = useRef<HTMLCanvasElement>(null);
  let mousePosition: { x: number, y: number } | undefined = undefined;
  let particlesArray: Particle[] = [];

  React.useEffect(() => {

    if (canvas?.current) {

      const ctx: CanvasRenderingContext2D | null = canvas.current.getContext('2d');

      const HandleCanvasResize = () => {
        if (canvas.current && ctx) {
          canvas.current.width = window.innerWidth;
          canvas.current.height = window.innerHeight;
        }
      };

      const HandleMouseMove = (e: MouseEvent) => {
        mousePosition = { x: e.x, y: e.y };
        AddParticles();
      };

      /**
       * Adds particles where at the position of variable "mousePosition"
       */
      const AddParticles = (iCount = 5) => {
        if (canvas.current && ctx && mousePosition) {
          for (let u = 0; u < iCount; u++)
            particlesArray.push(new Particle(canvas.current, ctx, mousePosition.x, mousePosition.y));
        }
      };

      /**
       * Draws
       */
      const InifiniteAnimate = () => {
        if (canvas.current && ctx) {
          if (particlesArray.length > 0) {

            // "Clear" the previous frame
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

            // Draw particles
            for (const particle of particlesArray)
              particle.Draw();

            // Remove particles that has shrunk below drawable size
            particlesArray = particlesArray.filter(p => p.IsExpired === false);
          }

          // Too few particles? Always keep some :)
          if (particlesArray.length < 10)
            AddParticles(1);

          // Repeat
          requestAnimationFrame(InifiniteAnimate);
        }
      };

      // *****************************************************
      // Initialize the canvas
      // *****************************************************

      HandleCanvasResize();
      InifiniteAnimate();

      // *****************************************************
      // Add event listeners (and clean up callbacks)
      // *****************************************************

      window.addEventListener('resize', HandleCanvasResize);
      window.addEventListener('click', HandleMouseMove);
      window.addEventListener('mousemove', HandleMouseMove);
      return () => {
        window.removeEventListener('resize', HandleCanvasResize);
        window.removeEventListener('click', HandleMouseMove);
        window.removeEventListener('mousemove', HandleMouseMove);
      };

    }

  }, []);

  return <>
    <canvas ref={canvas} id="canvas1" />
  </>;
}

export default MouseTrail;
