import { Button } from "react-bootstrap";

const Input = (props) => {
    const inputStyle ={
        border: '3px solid blue'
    };
    return (<div>
        {props.pty}
        <button onClick={props.changecall}>Montreal</button>
        </div>);
};

export default Input;