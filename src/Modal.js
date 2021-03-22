import React, {useEffect} from 'react';

function Modal({modalContent,closeModal}){
    useEffect(()=>
    {
        setTimeout(()=>{closeModal()},2000)
    }

    )
    return (
        <div>
            <p className="modal">{modalContent}</p>
        </div>
    )
}
export default Modal