import { useState } from 'react'
import '../index.css'


export default function KeyboardKeys(props) {

    const isHeld = props.isHeld

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#c5c5c5"
    }

    return (
        <button 
            id={props.id}
            onClick={props.hold}
            style={styles} >{props.value}</button>
    )
}