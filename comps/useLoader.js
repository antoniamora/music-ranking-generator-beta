import { useState } from "react"

const useLoader = () =>
{
    const [isLoad, setIsLoad] = useState(false);

    const Loader = () => {
    return !isLoad && <div class="curtain">
            <span>♪</span>
        </div>
    }
        
    return [Loader, setIsLoad];
}

export default useLoader