import React from 'react'
import { useLottie } from "lottie-react";
import groovyWalkAnimation from './data.json'

const Spinner = () => {

  const groovyWalkAnimations = {
    animationData: groovyWalkAnimation,
    loop: true
  }
  const { View } = useLottie(groovyWalkAnimations)


  return (
    <div id="icon_container" >
         {View}
    </div>
  )
}

export default Spinner