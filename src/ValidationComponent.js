import React from 'react'

const ValidationComponent=({length}) =>{
    return (
        <div>
            {length > 5 ?("Text long enough"):("Text too short") }
        </div>
    )
}

export default ValidationComponent;
