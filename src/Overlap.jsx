import React, { useEffect, useState } from 'react'
const radius=30;
function Overlap() {

const[circleCoords,setCircleCoords]=useState([]);

const drawCircle=(event)=>{
    const x=event.clientX;
    const y=event.clientY;
    setCircleCoords(prev=>[...prev,{x,y}]);
};

useEffect(()=>{
    document.addEventListener('click',drawCircle);
    return()=>document.removeEventListener('click',drawCircle);
},[]);

const colors=["plum","orange","aqua","lightblue"];

const findIntersections=(circleCoordsList,x1,y1)=>{
    let noofIntersects=0;
    circleCoordsList.forEach(circle=>{
        
    const x2=circle.x;
    const y2=circle.y;

    const distance=Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
    if(x1!==x2 || y1!==y2){
        if(distance<2*radius) noofIntersects++;
    }
    });
    return noofIntersects;
};

  return (
    <div className='wrapper'>
        <h1>
            Overlapping Circles
        </h1>
        {circleCoords.map((coord,index)=>{
            const intersections=findIntersections(circleCoords,coord.x,coord.y);
            return(
                <Circle key={index} x={coord.x} y={coord.y} color={colors[intersections]} intersections={intersections}/>
            )
        })}
    </div>
  )
}

const Circle=({x,y,color,intersections})=>{
    return(
        <div style={{
            position:"absolute",
            left:x-radius,
            top:y-radius,
            backgroundColor:color || "plum",
            height:`${2*radius}px`,
            width:`${2*radius}px`,
            borderRadius:"50%",
            border:"1px solid white"}}>{intersections}</div>
    )
}

export default Overlap