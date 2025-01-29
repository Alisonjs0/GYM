import React from "react";

interface InfoAlunoProps {
    title: string;
    content: string | number;
    className?: string
}

const InfoAluno = (props: InfoAlunoProps) => {
  return (
    <div className={`w-4/5 flex flex-col justify-center mx-auto mb-2 ${props.className}`}>
      <p className="mb-px">{props.title} : </p>
      <p className="pl-4 border-b border-[#F4F4F5] shadow shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
        {props.content || "N/A"}
      </p>
    </div>
  );
};

export default InfoAluno;
