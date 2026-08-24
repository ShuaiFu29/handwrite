import { useState } from "react";

function ChildA({count}){
    return <div>当前数字：{count}</div>
}

function ChildB({onAdd}){
    return <button onClick={onAdd}>+1</button>
}

export default function Parent(){
    let [count,setCount]=useState(0)
    let handleAdd=()=>{
        setCount(pre=>pre+1)
    }
    return (
        <div>
            <ChildA count={count}/>
            <ChildB onAdd={handleAdd}/>
        </div>
    )
}