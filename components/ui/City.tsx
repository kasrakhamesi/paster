
/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, use, useContext, useEffect, useRef, useState } from 'react';
import cityImage from '@/public/images/city.png';
import pinkImage from '@/public/images/pink.svg';
import orangeImage from '@/public/images/orange.svg';
import yellowImage from '@/public/images/yellow.svg';
import greenImage from '@/public/images/green.svg';
import shipImage from '@/public/images/ship.png';

import Image from 'next/image';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeContext';

const City = () => {
    const cityRef = useRef<HTMLImageElement>(null);
    const pinkRef = useRef<HTMLImageElement>(null);
    const orangeRef = useRef<HTMLImageElement>(null);
    const yellowRef = useRef<HTMLImageElement>(null);
    const greenRef = useRef<HTMLImageElement>(null);
    const shipRef = useRef<HTMLImageElement>(null);
    const size = 100;
    const { theme, setTheme } = useContext(ThemeContext);
    const [isDark, setIsDark] = useState<boolean>(theme === 'dark' ? true : false);

    const handleMouseMove = (event: MouseEvent) => {
        if (!cityRef.current || !pinkRef.current || !orangeRef.current || !yellowRef.current || !greenRef.current || !shipRef.current) return;

        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (clientX - centerX) * 0.04 * (size / 100);
        const offsetY = (clientY - centerY) * 0.04 * (size / 100);

        const scaleCity = 1 + (offsetX / centerX) * 0.2;
        const scalePink = 1 + (offsetX / centerX) * 0.3;
        const scaleOrange = 1 + (offsetX / centerX) * 0.3;
        const scaleYellow = 1 + (offsetX / centerX) * 0.4;
        const scaleGreen = 1 + (offsetX / centerX) * 0.4;
        const scaleship = 1 + (offsetX / centerX) * 0.4;

        // orangeRef.current.style.perspectiveOrigin = "left center";
        // orangeRef.current.style.transformOrigin = "0 0";
        cityRef.current.style.transform = `translate3d(${offsetX * -0.2}px,  ${8 + offsetY * -0.2}px, 0) scale(${scaleCity})`;
        pinkRef.current.style.transform = `translate3d(${offsetX * -0.4}px,  ${8 + offsetY * -0.3}px, 0) scale(${scalePink})`;
        orangeRef.current.style.transform = `translate3d(${offsetX * -0.2}px,  ${7 + offsetY * -0.4}px, 0) scale(${scaleOrange})`;
        yellowRef.current.style.transform = `translate3d(${offsetX * -0.3}px,  ${8 + offsetY * -0.4}px, 0) scale(${scaleYellow})`;
        greenRef.current.style.transform = `translate3d(${offsetX * -0.3}px,  ${8 + offsetY * -0.4}px, 0) scale(${scaleGreen})`;
        shipRef.current.style.transform = `translate3d(${offsetX * 0.3}px,  ${8 + offsetY * -0.4}px, 0) scale(${scaleship})`;

    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [size]);

    useEffect(() => {

        if (theme === 'dark') {
            setIsDark(true);
        } else if (theme === 'cupcake') {
            setIsDark(false);
        }
    }
        , [theme]);

    const changeTheme = () => {
        if (theme === 'dark') {
            setTheme('cupcake');
        } else {
            setTheme('dark');
        }
    }
    const resetTheme = () => {
        if (isDark) {
            setTheme('dark');
        } else {
            setTheme('cupcake');
        }
    }

    return (
        <div className={clsx("relative")} style={{ width: `${size}%`, height: `${size}%` }}>
            <div className="relative w-full h-full">
                <Image
                    onClick={changeTheme}
                    ref={cityRef}
                    src={cityImage}
                    alt="city"
                    className={"relative z-[15] w-full block mx-auto cursor-pointer"}
                />
                <Image
                    onMouseEnter={() => { setTheme('valentine') }}
                    onMouseLeave={resetTheme}

                    ref={pinkRef}
                    src={pinkImage}
                    alt="pink"
                    className="absolute z-[19] w-[90%] -top-[5%] mx-auto block left-[25%]"
                />
                <Image
                    onMouseEnter={() => { setTheme('retro') }}
                    onMouseLeave={resetTheme}

                    ref={orangeRef}
                    src={orangeImage}
                    alt="orange"
                    className="absolute z-[18] w-[95%] -top-[18%] left-[26%]"
                />
                <Image
                    onMouseEnter={() => { setTheme('cyberpunk') }}
                    onMouseLeave={resetTheme}

                    ref={yellowRef}
                    src={yellowImage}
                    alt="yellow"
                    className="absolute z-[17] w-[100%] -top-[35%] left-[25%]"
                />
                <Image
                    onMouseEnter={() => { setTheme('forest') }}
                    onMouseLeave={resetTheme}

                    ref={greenRef}
                    src={greenImage}
                    alt="green"
                    className="absolute z-[16] w-[90%] -top-[45%] left-[25%]"
                />
                <Image


                    ref={shipRef}
                    src={shipImage}
                    alt="spaceship"
                    className="absolute z-[14] w-[8%] top-[5%] left-[30%]"
                />
            </div>
        </div>
    );
};

export default City;

