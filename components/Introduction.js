"use client"
import gsap from "gsap"
import SplitText from "gsap/dist/SplitText"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-web"
import programmerAnimation from "../public/json/programmer.json"
import FadeIn from "./common/FadeIn"
import useGsapContext from "./common/useGsapContext"
import ScrollMe from "./common/ScrollMe"

const Introduction = () => {
	const introRef = useRef()
	const lottieRef = useRef()
	const [isLoading, setIsLoading] = useState(true)
	const [animation, setAnimation] = useState()

	gsap.registerPlugin(SplitText, ScrollTrigger)
	const ctx = useGsapContext(introRef)

	useEffect(() => {
		let animation = Lottie.loadAnimation({
			container: lottieRef.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: "/json/programmer.json",
		})

		setAnimation(animation)
		return () => {}
	}, [])

	useEffect(() => {
		setIsLoading(false)
		ctx.add(() => {
			let tl = new gsap.timeline()

			const headline = SplitText.create(".headline-title", {
				type: "chars",
				charsClass: "headline-character",
			})

			const description = SplitText.create(".headline-description", {
				type: "words",
				wordsClass: "headline-word",
			})

			tl.to(headline.chars, {
				y: 0,
				stagger: 0.05,
				delay: 0.9,
				duration: 0.3,
				ease: "power3.out",
			})
				.to(description.words, {
					y: 0,
					stagger: 0.016,
					delay: 0.1,
					duration: 0.3,
					ease: "power3.out",
				})
				.to(".lottie-programmer", {
					autoAlpha: 1,
					delay: 0.15,
					duration: 1,
					ease: "power3.in",
				})
				.to(".scroll-me", {
					autoAlpha: 1,
					delay: 0.15,
					duration: 1,
					ease: "power3.in",
				})
		})

		return () => {
			ctx.revert()
		}

		// ScrollTrigger.create({
		// 	trigger: (".headline-title"),
		// 	animation: tl,
		// 	start: "top bottom",
		// 	end: "bottom bottom",
		// 	invalidateOnRefresh: true,
		// 	smoothChildTiming: true,
		// })
		// ScrollTrigger.create({
		// 	trigger: (".lottie-programmer"),
		// 	animation: tl,
		// 	start: "top bottom",
		// 	end: "bottom bottom",
		// 	invalidateOnRefresh: true,
		// 	smoothChildTiming: true,
		// 	scrub: true,
		// })
	}, [ctx])

	return (
		<section className="introduction-section" ref={introRef}>
			<div className="left pl-6">
				<div className="headline">
					<h1>
						<div className="headline-title">Hi,</div>
						<div className="headline-title">I&apos;m Eyad Alasfahani</div>
					</h1>
					<p className="headline-description">
						A passionate web developer specializing in creating dynamic web
						applications from scratch. With expertise in both frontend and
						backend development, I leverage technologies like Next.js for
						frontend and PHP Laravel for backend to craft captivating and
						customer-centric web solutions. My goal is to help agencies and
						companies enhance their online presence, <br /> attract a wider
						audience, and deliver exceptional user experiences.
					</p>
				</div>
			</div>
			<div className="right">
				<div className="lottie-container" ref={lottieRef}>
				</div>
			</div>
			<ScrollMe />
		</section>
	)
}

export default Introduction
