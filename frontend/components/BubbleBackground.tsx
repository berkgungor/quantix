'use client';

import React, { useEffect, useRef } from 'react';

interface BubbleColors {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
}

interface BubbleBackgroundProps extends React.ComponentProps<'div'> {
  interactive?: boolean;
  colors?: BubbleColors;
}

const defaultColors: BubbleColors = {
  first: "18,113,255",
  second: "221,74,255", 
  third: "0,220,255",
  fourth: "200,50,50",
  fifth: "180,180,50",
  sixth: "140,100,255"
};

export default function BubbleBackground({ 
  interactive = false, 
  colors = defaultColors,
  className = "",
  ...props 
}: BubbleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }

    const bubbles: Bubble[] = [];
    const colorValues = Object.values(colors);

    // Create initial bubbles
    const createBubble = (x?: number, y?: number): Bubble => ({
      x: x ?? Math.random() * width,
      y: y ?? Math.random() * height,
      radius: Math.random() * 100 + 50,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: colorValues[Math.floor(Math.random() * colorValues.length)],
      alpha: Math.random() * 0.5 + 0.1
    });

    // Initialize bubbles
    for (let i = 0; i < 6; i++) {
      bubbles.push(createBubble());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((bubble, index) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off edges
        if (bubble.x < -bubble.radius || bubble.x > width + bubble.radius) {
          bubble.vx *= -1;
        }
        if (bubble.y < -bubble.radius || bubble.y > height + bubble.radius) {
          bubble.vy *= -1;
        }

        // Keep bubbles in bounds
        bubble.x = Math.max(-bubble.radius, Math.min(width + bubble.radius, bubble.x));
        bubble.y = Math.max(-bubble.radius, Math.min(height + bubble.radius, bubble.y));

        // Create gradient
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.radius
        );
        gradient.addColorStop(0, `rgba(${bubble.color}, ${bubble.alpha})`);
        gradient.addColorStop(1, `rgba(${bubble.color}, 0)`);

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      bubbles.forEach(bubble => {
        const dx = mouseX - bubble.x;
        const dy = mouseY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          bubble.vx += (dx / distance) * force * 0.2;
          bubble.vy += (dy / distance) * force * 0.2;
          
          // Apply damping
          bubble.vx *= 0.98;
          bubble.vy *= 0.98;
        }
      });
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interactive, colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} {...props}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
