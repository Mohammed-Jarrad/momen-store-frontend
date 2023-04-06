import React, { useEffect, useState } from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'

export const hex2rgb = color => {
	const r = parseInt(color.substr(1, 2), 16);
	const g = parseInt(color.substr(3, 2), 16);
	const b = parseInt(color.substr(5, 2), 16);
	return `rgb(${r}, ${g}, ${b})`;
};

const Colors = ({colors, setColors}) => {
    // states
    const [inputValue, setInputValue] = useState('#000000')
    
    function handleChangeColor(e) {
        setInputValue( (e.target.value))
    }

    function handleAddColor(value) {
        let clone = [...colors]
        if(value && !clone.includes(hex2rgb(value))) {
            clone.push(hex2rgb(value))
            setColors(clone)
        }
    }

    function removeColor(color) {
        let clone = [...colors]
        let clone2 = clone.filter(c => c !== color)
        setColors(clone2)
    }
    
  return (
    <div className="colors">
        
        <div className="label">
            ألوان المنتج
        </div>

        <div className="content">

            <form onSubmit={e => {
                e.preventDefault()
                handleAddColor(inputValue)
            }}>
                <input type="color" onChange={handleChangeColor} value={inputValue}/>
                <button>إضافة</button>
            </form>


            {typeof colors =='object' &&[...colors].length > 0 && (
                <div className="selected-colors-view">
                    {[...colors].map((color, index) => (
                        <div className="selected-item" key={index}
                            style={{
                                width: "40px",
                                height: "40px",
                                background: color ? color : ""
                            }}>
                            <AiFillCloseCircle
                                style={{
                                    color: color === 'rgb(0, 0, 0)' ? "white" : "black"
                                }}
                            onClick={() => removeColor(color)} />
                        </div>
                    ))}
                </div>
            )}

            
        </div>


    </div>
  )
}

export default Colors
