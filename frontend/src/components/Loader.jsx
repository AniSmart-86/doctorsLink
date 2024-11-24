import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import ReactDom from 'react-dom'


const Loader = ()=>{

    // .wrapper {
    //     position: fixed;
    //     width: 100vw;
    //     height: 100vh;
    //     background-color: rgba(0, 0, 0, 0.7);
    //     z-index: 9;
    //   }
      
    //   .loader {
    //     position: fixed;
    //     left: 50%;
    //     top: 50%;
    //     transform: translate(-50%, -50%);
    //     z-index: 999;
    //   }

    return ReactDom.createPortal (
<div className='fixed w-full h-full bg-transparent bg-slate-950 opacity-55 z-9'>
    <div className='fixed left-52 t2 riop-5ght-52 translate-x-1/2 translate-y-1/2 z-999'>

 <BeatLoader
       
       color='#fffff'
       size={30}
       aria-label="Loading Spinner"
       data-testid="loader"
       />
       </div>
</div>,
document.getElementById('spinner')
    )
}

export default Loader





{/* BeatLoader	15				2
BounceLoader	60				
CircleLoader	50				
ClimbingBoxLoader	15				
ClipLoader	35				
ClockLoader	50				
DotLoader	60				2
FadeLoader		15	5	2	2
GridLoader	15				
HashLoader	50				2
MoonLoader	60				2
PacmanLoader	25				2
PropagateLoader	15				
PuffLoader	60				
PulseLoader	15				2
RingLoader	60				2
RiseLoader	15				2
RotateLoader	15				2
ScaleLoader		35	4	2	2
SyncLoade */}

  