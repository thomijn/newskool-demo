import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ImageScrollAnimation = () => {
    const canvasRef = useRef(null);
    const [imagesState, setImages] = useState();
    const numImages = 100;
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth; // Set to desired width
        canvas.height = window.innerHeight; // Set to desired height
        // Load images with specific naming convention
        const images = [];
        for (let i = 0; i <= numImages; i++) {
            const img = new Image();
            const imgNumber = String(i).padStart(5, "0"); // Pad the number to 5 digits
            img.src = `/WebP_Export/2023032_Markets_Scroll_Anim_${imgNumber}.webp`;
            images.push(img);
        }

        Promise.all(
            images.map((img) => {
                return new Promise((resolve) => {
                    img.onload = () => resolve();

                    img.onerror = (e) => console.log(img.src);
                });
            })
        )
            .then(() => {
                drawFrame(
                    0,
                    ctx,
                    canvas,
                    images
                );
                gsap.to(
                    {},
                    {
                        frame: numImages - 1,
                        snap: "frame",
                        scrollTrigger: {
                            scrub: 1,
                            trigger: ".canvas-container",
                            start: "top top",
                            end: "bottom bottom",
                            markers: true,
                            onUpdate: (self) => {
                                console.log(self.progress)
                                drawFrame(
                                    self.progress.toFixed(3) * (numImages - 1),
                                    ctx,
                                    canvas,
                                    images
                                );
                            },
                        },
                    }
                );
            })
            .catch((err) => console.log(err));
        // Ensure all images are loaded
    }, []);

    useGSAP(() => {
        const tlGrow = gsap.timeline({
            scrollTrigger: {
                trigger: ".canvas-container",
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
            },
        });

        tlGrow
            .to(canvasRef.current, {
                duration: 2,
                width: '100svw',
                height: '100svh',
                borderRadius: 0,
            })
            .to(
                canvasRef.current,
                {
                    duration: 3,
                    width: '80svw',
                    height: '80svh',
                    borderRadius: 40,
                },
                '+=2'
            );

        // gsap.to(canvasRef.current, {
        //     scrollTrigger: {
        //         pin: true,
        //         trigger: ".canvas-container",
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 1,
        //     },
        //     width: "100%",
        //     height: "100vh",
        //     borderRadius: 0,
        // });
    }, { scope: canvasRef.current });


    function drawFrame(frame, ctx, canvas, images) {
        const img = images[Math.floor(frame)];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = img.width * (canvas.height / img.height);
            drawHeight = canvas.height;
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    return <div className="canvas-container">
        <div className="inner">
            <canvas ref={canvasRef}></canvas>
        </div>
    </div>;
};

export default ImageScrollAnimation;
