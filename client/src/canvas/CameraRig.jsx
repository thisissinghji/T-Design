import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef(); 
  /*useRef is used to remember or point to someting in our program
  From the name itself it is clear that it is used for referencing or remebering or pointing*/
  
  const snap = useSnapshot(state);  

  useFrame((state, delta) => {
    /*We often want to update the scene on every frame of animation
    This is where seFrame comes into action
    takes two parameters state and delta, state provides the information
    of the current state while delta represents the time sicne the last frame
    In simple terms, like we have media queries in CSS, here we have useFrame*/ 
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    
    let targetPosition = [-0.3, 0, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }
    /*this will set the postion of the model, 
    keep in mind that the z-axis will determine the size of the object
    as it is responsible for moving the object towards or away from the screen*/ 

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig