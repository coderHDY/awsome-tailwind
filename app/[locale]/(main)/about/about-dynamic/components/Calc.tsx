"use client";
import React, { useState } from "react";

const Calc = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleCalc = (op: string) => {
    let res = 0;
    switch (op) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num2 !== 0 ? num1 / num2 : NaN;
        break;
      default:
        res = 0;
    }
    setResult(res);
  };

  return (
    <div className="p-4 border rounded w-80 bg-base-100 shadow">
      <h2 className="text-lg font-bold mb-2">简单计算器</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="number"
          value={num1}
          onChange={e => setNum1(Number(e.target.value))}
          className="input input-bordered w-1/2"
        />
        <input
          type="number"
          value={num2}
          onChange={e => setNum2(Number(e.target.value))}
          className="input input-bordered w-1/2"
        />
      </div>
      <div className="flex gap-2 mb-2">
        <button className="btn btn-primary" onClick={() => handleCalc("+")}>+</button>
        <button className="btn btn-primary" onClick={() => handleCalc("-")}>-</button>
        <button className="btn btn-primary" onClick={() => handleCalc("*")}>*</button>
        <button className="btn btn-primary" onClick={() => handleCalc("/")}>/</button>
      </div>
      <div>
        结果: <span className="font-bold">{result !== null ? result : "-"}</span>
      </div>
    </div>
  );
};

export default Calc;
