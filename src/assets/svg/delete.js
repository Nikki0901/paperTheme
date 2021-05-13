import React from 'react';


function Delete({onClick}) {
  
    return (
        <div style={{cursor:"pointer"}} onClick={onClick}>
           <svg height="18px" width="18px"  id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.   org/2000/svg"     viewBox="0 0 512 512"><defs>
               <style></style></defs><title>Delete</title><path className="cls-1" d="M469.33,85.33H362.67v-64A21.33,21.33,0,0,0,341.33,0H170.67a21.33,21.33,0,0,0-21.33,21.33v64H42.67a21.33,21.33,0,1,0,0,42.67H64V490.67A21.33,21.33,0,0,0,85.33,512H426.67A21.33,21.33,0,0,0,448,490.67V128h21.33a21.33,21.33,0,1,0,0-42.67ZM192,42.67H320V85.33H192ZM405.33,469.33H106.67V128H405.33Z"/><path className="cls-1" d="M170.67,426.67A21.33,21.33,0,0,0,192,405.33V192a21.33,21.33,0,1,0-42.67,0V405.33A21.33,21.33,0,0,0,170.67,426.67Z"/><path className="cls-1" d="M256,426.67a21.33,21.33,0,0,0,21.33-21.33V192a21.33,21.33,0,1,0-42.67,0V405.33A21.33,21.33,0,0,0,256,426.67Z"/><path className="cls-1" d="M341.33,426.67a21.33,21.33,0,0,0,21.33-21.33V192A21.33,21.33,0,1,0,320,192V405.33A21.33,21.33,0,0,0,341.33,426.67Z"/></svg>
        </div>
    );
}

export default Delete;

