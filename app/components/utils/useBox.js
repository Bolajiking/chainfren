import React from 'react'

const useBox = (height) => {
    let smallestRemainder = Number.MAX_VALUE; // Initialize with a large value
    let correspondingI = null;
    
    for (let i = 65; i < 75; i++) {
      const result = (window.innerWidth / i) * (window.innerHeight / i);
      const remainder = result % 1;
    
      if (remainder <= 0.12 && remainder < smallestRemainder) {
        smallestRemainder = remainder;
        correspondingI = i;
      }
    }
    

    

    const boxHorizontal=window.innerWidth/correspondingI
    const boxVertical=window.innerHeight/correspondingI
    const boxnumber=boxHorizontal*boxVertical

  return[ Math.floor(boxnumber),correspondingI,smallestRemainder]
}

export default useBox