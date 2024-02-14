import React from 'react'
import Navbar from './components/navbar/Navbar'
import FalseCeiling from './components/lights/FalseCeiling'
import Aquarium from './components/aquarium/Aquarium'
import Window from './components/window/Window'
import Garden from './components/garden/Garden'
import Floor from './components/floor/Floor'
import Tv from './components/tv/Tv'

const App = () => {
  return (
    <>
    <Navbar/>
    <FalseCeiling/>
    <Aquarium/>
    <Window/>
    <Garden/>
    <Floor />
    <Tv/>
    </>
  )
}

export default App