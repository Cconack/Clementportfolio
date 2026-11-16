"use client";
import React, { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

import Link from "next/link";

import fastdom from "fastdom";
import Image from "next/image";
import cursorPointer from "../../../public/icons/cursor.svg";

type SelectedWorkItem =
  | {
      number: string;
      title: string;
      link: string;
      mediaType: "video";
      videoSrc: string;
    }
  | {
      number: string;
      title: string;
      link: string;
      mediaType: "image";
      imageSrc: string;
    };

const SelectedWork = () => {
  const selectedWorks: SelectedWorkItem[] = [
    {
      number: "01",
      title: "Paysmart",
      link: "",
      mediaType: "video",
      videoSrc:
        "https://res.cloudinary.com/do6zhtnvt/video/upload/v1762376264/Showreel-Grid-Mobile-_remix_1_yxqfyl.mp4",
    },
    {
      number: "02",
      title: "Ethifunds",
      link: "https://www.ethifunds.com",
      mediaType: "video",
      videoSrc:
        "https://res.cloudinary.com/do6zhtnvt/video/upload/v1794858514/Screen_Recording_2026-01-03_at_01.32.02_uonbor.mov",
    },
    {
      number: "03",
      title: "Motobills",
      link: "https://motobills.com",
      mediaType: "image",
      imageSrc:
        "https://res.cloudinary.com/do6zhtnvt/image/upload/v1767395171/Frame_2147225640_rrk3pk.png",
    },
    {
      number: "04",
      title: "Taxpadi",
      link: "https://dwellar.com",
      mediaType: "image",
      imageSrc:
        "https://res.cloudinary.com/do6zhtnvt/image/upload/v1767376445/mac_rzpb70.png",
    },
    {
      number: "05",
      title: "Leonardo",
      link: "https://leonardobysujimoto.com",
      mediaType: "video",
      videoSrc:
        "https://res.cloudinary.com/do6zhtnvt/video/upload/v1716199529/Leonadooo_pn4rdj.mov",
    },
    {
      number: "06",
      title: "BridgingSpace",
      link: "https://bridgingspace.co",
      mediaType: "video",
      videoSrc:
        "https://res.cloudinary.com/do6zhtnvt/video/upload/v1716196343/bridgingspace_i8y2h1.mov",
    },
  ];

  const [activeWork, setActiveWork] = useState<SelectedWorkItem | null>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // const videoSrc = "/videos/designer.mp4";
  const [itemsRef, setItemsRef] = useState<
    {
      divRef: React.RefObject<HTMLDivElement>;
      mediaContainerRef: React.RefObject<HTMLDivElement>;
      videoRef: React.RefObject<HTMLVideoElement>;
    }[]
  >(() =>
    Array(selectedWorks.length)
      .fill(null)
      .map(() => ({
        divRef: React.createRef(),
        mediaContainerRef: React.createRef(),
        videoRef: React.createRef(),
      }))
  );

  const handleHover = (index: number, isHovered: boolean) => {
    fastdom.mutate(() => {
      const itemRef = itemsRef[index];
      const mediaContainerRef = itemRef?.mediaContainerRef.current;
      const videoRef = itemRef?.videoRef.current;

      const tl = gsap.timeline({ paused: true });

      if (isHovered && mediaContainerRef) {
        if (videoRef) {
          videoRef.play();
        }
        tl.to(mediaContainerRef, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        });
        if (videoRef) {
          tl.to(videoRef, {
            autoAlpha: 1,
            duration: 0.1,
            ease: "power2.out",
          });
        }
        tl.play();
      } else if (mediaContainerRef) {
        if (videoRef) {
          requestAnimationFrame(() => videoRef.pause());
          tl.to(videoRef, {
            autoAlpha: 0,
            duration: 0.1,
            ease: "power2.in",
          });
        }
        tl.to(mediaContainerRef, {
          opacity: 0,
          duration: 0.1,
          ease: "power2.in",
        })
          .play();
      }
    });
  };

  return (
    <div
      className='w-full h-auto bg-black flex justify-center items-center py-10 lg:py-[10rem]'
      id='selectedWorks'
    >
      <div className='w-full h-auto px-5 lg:px-[8rem] flex flex-col space-y-10 lg:space-y-[12rem]'>
        <p className='font-staatliches text-white text-[54px] lg:text-[165px] leading-[144px]'>
          Selected Works
        </p>
        <div className='flex flex-col space-y-10'>
          {selectedWorks.map((work, index) => (
            <div
              className='group flex flex-col lg:flex-row space-y-5 lg:space-y-0 justify-between border-b-[2px] border-[#D9D9D9] border-opacity-[.70] relative py-5'
              key={index}
              onMouseEnter={() => {
                if (!("ontouchstart" in window) && window.innerWidth > 768) {
                  handleHover(index, true);
                }
              }}
              onMouseLeave={() => {
                if (!("ontouchstart" in window) && window.innerWidth > 768) {
                  handleHover(index, false);
                }
              }}
              ref={itemsRef[index].divRef}
            >
              <div className='flex space-x-5 items-start cursor-pointer'>
                <p className='font-staatliches text-white text-opacity-[.60] group-hover:text-opacity-[1] text-[15.125px] lg:text-[40px] leading-[115%]'>
                  {work.number}
                </p>

                {isMobile ? (
                  <div
                    className='font-staatliches text-white text-opacity-[.60] group-hover:text-opacity-[1] text-[48.399px] lg:text-[128px] leading-normal'
                    onClick={() => {
                      setActiveWork((currentWork) =>
                        currentWork?.title === work.title ? null : work
                      );
                    }}
                  >
                    {work.title}
                  </div>
                ) : (
                  <Link
                    href={work.link}
                    className='font-staatliches text-white text-opacity-[.60] group-hover:text-opacity-[1] text-[48.399px] lg:text-[128px] leading-normal'
                    target='_blank'
                  >
                    {work.title}
                  </Link>
                )}
              {/* If this is the first work (Ethifunds), show a right-aligned cursor pointer */}
              {index === 0 && (
                <Image
                  src={cursorPointer}
                  alt='cursor pointer'
                  className='absolute top-10 lg:top-0 right-0 lg:right-[10rem] h-[60px] w-auto lg:h-fit'
                />
              )}
              </div>

              <div
                className='media-container absolute pointer-events-none right-0 top-0 w-[450px] h-[301px] rounded-[32px] bg-[#C4C4C4] flex justify-center items-center transform rotate-[0deg] z-50 shadow-lg opacity-0'
                ref={itemsRef[index].mediaContainerRef}
              >
                {work.mediaType === "image" ? (
                  <Image
                    src={work.imageSrc}
                    alt={`${work.title} preview`}
                    fill
                    unoptimized
                    className='object-cover rounded-[32px]'
                  />
                ) : (
                  <video
                    ref={itemsRef[index].videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-full h-full object-cover rounded-[32px]'
                  >
                    <source src={work.videoSrc} type='video/mp4' />
                  </video>
                )}
              </div>

              {activeWork?.title === work.title && (
                <Link
                  href={work.link}
                  className='pointer-events-none relative block w-full h-[220px] overflow-hidden rounded-[16px] bg-[#C4C4C4] z-50 shadow-lg lg:hidden transition-all duration-500'
                  target='_blank'
                >
                  {activeWork.mediaType === "image" ? (
                    <Image
                      src={activeWork.imageSrc}
                      alt={`${activeWork.title} preview`}
                      fill
                      unoptimized
                      className='object-cover rounded-[16px] transition-all duration-500'
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='w-full h-full object-cover rounded-[16px] transition-all duration-500'
                    >
                      <source src={activeWork.videoSrc} type='video/mp4' />
                    </video>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedWork;
