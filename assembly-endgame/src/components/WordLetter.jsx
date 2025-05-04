import { useState } from 'react'
import '../index.css'


export default function WordLetter(props) {

    const isFound = props.isFound

    const styles = {
        color: isFound ? "white" : "#1a1a1a"
    }

    return (
        <button 
            id={props.id} 
            style={styles}>{props.value}</button>
    )
}