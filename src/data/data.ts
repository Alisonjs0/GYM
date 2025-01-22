export function getData() {
    let total = 0
    const data = [
        { month: "January", "Alunos Matriculados": 186, "Desistencias": 80, valor: 186 },
        { month: "February", "Alunos Matriculados": 305, "Desistencias": 200, valor: 305 },
        { month: "March", "Alunos Matriculados": 237, "Desistencias": 120, valor: 237 },
        { month: "April", "Alunos Matriculados": 73, "Desistencias": 190, valor: 73 },
        { month: "May", "Alunos Matriculados": 209, "Desistencias": 130, valor: 209 },
        { month: "June", "Alunos Matriculados": 214, "Desistencias": 140, valor: 214 },
    ]
    
    const totAtivos = data.reduce((total, item) => {
        const ativos = item["Alunos Matriculados"] - item["Desistencias"];
        return total + (ativos > 0 ? ativos : 0);
    }, 0)

    total = totAtivos

    function newAluno() {
        total += 1
    }

    function desistencia() {
        total -= 1
    }
    
    return { data, total, newAluno, desistencia }
}
