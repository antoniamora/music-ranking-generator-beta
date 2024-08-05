import { useState } from "react";

const useAlert = () =>
{
    const [states, setStates] = useState({ isVisible : false, msg : "Ha ocurrido un error."})

    const trigger = (text="Ha ocurrido un error.") =>
    {
        setStates({ isVisible : true, msg : text });
        setTimeout(() => { setStates({ isVisible : false, msg : text }) }, 5000);
    }

    const Component = () => states.isVisible ? <div className='alert'>
        <h3>{ states.msg }</h3>
    </div> : null;

    return [Component, trigger];
}
export default useAlert;