import React from 'react'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import GithubStats from './GithubStats'
import Recognition from './Recognition'
import Interests from './Interests'
import Contact from './Contact'
import Timeline from './Timeline'

const MainContent = ({ theme }) => {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <GithubStats theme={theme} />
      <Recognition />
      <Interests />
      <Contact />
    </>
  )
}

export default MainContent
