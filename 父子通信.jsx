import { useState } from 'react';

function ChildA({ count }) {
  return <div>当前数字：{count}</div>
}

function ChildB({ onAdd }) {
  const [step, setStep] = useState(1);
  return (
    <div>
      <input 
        type="number" 
        value={step} 
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <button onClick={() => onAdd(step)}>按这个数值增加</button>
    </div>
  )
}

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleAdd = (step) => {
    setCount(prev => prev + step);
  };

  return (
    <div>
      <ChildA count={count} />
      <ChildB onAdd={handleAdd} />
    </div>
  )
}