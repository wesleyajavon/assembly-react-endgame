import '../index.css'


export default function KeyboardKeys(props) {

    const styles = {
        backgroundColor: props.toGreen ? "#59E391": props.toRed ? "red" :  "#c5c5c5"
    }

    return (
        <button 
            disabled={props.disabled}
            id={props.id}
            onClick={props.hold}
            style={styles} >{props.value}</button>
    )
}