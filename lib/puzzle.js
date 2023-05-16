// Acessando o elemento do botão através do seu ID 'show-hint'
const button = document.getElementById('show-hint')

// Acessando o elemento de dica através da sua classe 'hint'
const hint = document.querySelector('.hint')

// Adicionando um ouvinte de eventos ao botão que é acionado ao clicar nele
button.addEventListener('click',(event) => {
    // Alterna a classe 'active' no elemento de dica quando o botão é clicado
    hint.classList.toggle('active')
})

// Função que verifica se um bloco pode se mover
const canMove = (td) => {
    // Obtendo a coluna e a linha do bloco clicado
    const tdCol = td.cellIndex
    const tdRow = td.parentElement.rowIndex

    // Obtendo o bloco vazio
    const empty = document.querySelector('.empty')

    // Obtendo a coluna e a linha do bloco vazio
    const emptyCol = empty.cellIndex
    const emptyRow = empty.parentElement.rowIndex

    // A linha de código abaixo verifica se o bloco (tile) pode ser movido para a posição do bloco vazio.
    // Ela retorna um valor booleano que indica se o movimento é possível.
    //
    // 1. tdCol === emptyCol && (tdRow + 1 === emptyRow || tdRow - 1 === emptyRow):
    //    Esta parte verifica se o bloco está na mesma coluna que o bloco vazio (tdCol === emptyCol)
    //    e se está imediatamente acima (tdRow + 1 === emptyRow) ou abaixo (tdRow - 1 === emptyRow) dele.
    //
    // 2. tdRow === emptyRow && (tdCol + 1 === emptyCol || tdCol - 1 === emptyCol):
    //    Esta parte verifica se o bloco está na mesma linha que o bloco vazio (tdRow === emptyRow)
    //    e se está imediatamente à direita (tdCol + 1 === emptyCol) ou à esquerda (tdCol - 1 === emptyCol) dele.
    //
    // 3. ||:
    //    Este é um operador lógico OR que retorna verdadeiro se pelo menos uma das condições for verdadeira.
    //    Ou seja, se o bloco puder ser movido na vertical (primeira parte do código)
    //    OU na horizontal (segunda parte do código), a função retornará verdadeiro.
    //
    // Portanto, essa linha de código verifica se o bloco está adjacente ao bloco vazio, ou seja,
    // se está acima, abaixo, à esquerda ou à direita dele. Se for, ele pode ser movido para a posição vazia.

    return (tdCol === emptyCol && (tdRow + 1 === emptyRow || tdRow - 1 === emptyRow)) || (tdRow === emptyRow && (tdCol + 1 === emptyCol || tdCol - 1 === emptyCol))
}

// Função que verifica se o jogador ganhou
const checkWin = () => {
    // Obtendo todos os blocos
    const tds = document.querySelectorAll('td')

    // Armazenando as posições de todos os blocos
    const positions = []
    tds.forEach((td) => {
        positions.push(parseInt(td.innerText))
    })

    // Verificando se os blocos estão na ordem correta para ganhar o jogo
    if (positions.join(',') === '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN') {
        // Se o jogador ganhou, mostramos a mensagem de vitória
        document.getElementById('win').classList.remove('hidden-xs')
    } else {
        // Se o jogador ainda não ganhou, escondemos a mensagem de vitória
        document.getElementById('win').classList.add('hidden-xs')
    }
}

// Iniciando o jogo
const tds = document.querySelectorAll('td')
tds.forEach((td) => {
    // Adicionando um ouvinte de eventos a cada bloco que é acionado ao clicar nele
    td.addEventListener('click', (event) => {
        const td = event.currentTarget
        // Verificando se o bloco clicado pode se mover
        if (canMove(td)) {
            // Se o bloco pode se mover, trocamos o bloco vazio e o bloco clicado
            const empty = document.querySelector('.empty')
            empty.classList.remove('empty')
            td.classList.add('empty')
            const text = td.innerText
            empty.innerText = text
            td.innerText = ''
            // Verificando se o jogador ganhou depois de mover o bloco
            checkWin()
        } else {
            // Se o bloco não pode se mover, não fazemos nada
        }
    })
})
