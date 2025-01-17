import React from 'react'

export interface FormProps {
    campo1: string;
    campo2: string;
    campo3: string;
    campo4: string;
    campo5: string;
    children?: React.ReactNode;
    button: string;
}

const Forms = (props: FormProps) => {
  return (
    <>
    <h1>Cadastrar Aluno:</h1>
    <form>
        <label>
            <span>{props.campo1}</span>
            <input type="text" />
        </label>
        <label>
            <span>{props.campo2}</span>
            <input type="date" />
        </label>
        <label>
            <span>{props.campo3}</span>
            <select>
                <option value="masc">Masculino</option>
                <option value="fem">Feminino</option>
            </select>
        </label>
        <label>
            <span>{props.campo4}</span>
            <input type="tel" />
        </label>
        <label>
            <span>{props.campo4}</span>
            <select>
                <option value="mensal">Mensal</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
            </select>
        </label>
    </form>
    {props.children && <div className="mt-6">{props.children}</div>}
    <button>{props.button}</button>
    </>
  )
}

export default Forms