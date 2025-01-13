import { useEffect, useRef } from "react";

const InputWithLabel = ({todoTitle, handleTitleChange, children}) => {
  
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    return (    
    <>
        <label htmlFor="todoTitle"> {children} </label>
            <input
                ref={inputRef}
                value={todoTitle}
                onChange={handleTitleChange}
                type="text"
                id="todoTitle"
                name="title"     
            />
    </>
  )
}

export default InputWithLabel;