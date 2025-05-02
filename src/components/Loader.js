import React from 'react'
import { useState, CSSProperties } from "react";
import { ClipLoader, FadeLoader ,HashLoader} from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const Loader = () => {
    
  let [color, setColor] = useState("#ffffff");
  return (
    <div>
       <div className="sweet-loading">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}
      {/* <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      /> */}

      <HashLoader
        color='#b9dffa'
        
        loading={true}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader
