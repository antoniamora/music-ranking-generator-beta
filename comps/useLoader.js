import { useState } from "react";

const useLoader = () =>
{
    const [isLoad, setIsLoad] = useState(false);

    const Loader = () => {
    return !isLoad && <div className="curtain">
            <span>♪</span>
        </div>
    }
        
    return [Loader, setIsLoad];
}

export default useLoader