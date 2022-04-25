import * as React from 'react'
import './App.css'

export default function App() {

    const [wotd, setWotd] = React.useState(loadWords()[Math.floor(Math.random()*loadWords().length)].toUpperCase())
    const [row, setRow] = React.useState(0)
    const [col, setCol] = React.useState(0)
    const [boardDisplay, setBoardDisplay] = React.useState()
    const [board, setBoard] = React.useState([
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
    ])
    
    const keyType = (char : any) => {
        
        if(char == 1) {
            check()
        } else if(char == -1) {
            let newBoard = board
            newBoard[row][col] = ""
            setBoard(newBoard)
            if(col > 0) setCol(col - 1)
        } else {
            let newBoard = board
            newBoard[row][col] = char
            setBoard(newBoard)
            if(col < 4) setCol(col + 1)
        }

        setBoardDisplay(board.map((row) => {
            return (
                <tr id = "displayRow">
                    {row.map((column) => {
                        return (
                            <td id = "displayCell" style={{
                                backgroundColor: column.includes("[") ? "#2eb267" : 
                                                 column.includes("]") ? "#e6e27a" :
                                                 column.includes("!") ? "#454545" :
                                                "#888686"
                            }}>{column.replace("[","").replace("]","").replace("!","")}</td>
                        )
                    })}
                </tr>
            )
        }))
        
        console.log(col,row,board)
        console.log(wotd)
    }

    function loadWords() {
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("GET", "https://raw.githubusercontent.com/wjmack/Speedle/main/src/util/words.txt", false)
        xmlhttp.send()
        if (xmlhttp.status==200) {
            return xmlhttp.responseText.split("\n")
        }
        return null
    }

    function check() {
        for(var i = 0; i <= 4; i++) if(board[row][i] == '') return
        for(var i = 0; i <= 4; i++) {
            console.log(board[row][i],wotd[i])
            if(board[row][i] === wotd[i]) {
                board[row][i] = board[row][i].concat("[")
                console.log(board[row][i])
            }
            else if(wotd.includes(board[row][i]))
                board[row][i] = board[row][i].concat("]")
            else
                board[row][i] = board[row][i].concat("!")
        }
        setRow(row + 1)
        setCol(0)
    }
    
    return (
        <main>
            <div className = "header">Speedle</div>
            <table className = "display">
                {boardDisplay}
            </table>
            <table className = "keyboardTop">
                <tr id = "keyboardRow">
                    <td onClick = {() => keyType("Q")} id = "key">Q</td>
                    <td onClick = {() => keyType("W")} id = "key">W</td>
                    <td onClick = {() => keyType("E")} id = "key">E</td>
                    <td onClick = {() => keyType("R")} id = "key">R</td>
                    <td onClick = {() => keyType("T")} id = "key">T</td>
                    <td onClick = {() => keyType("Y")} id = "key">Y</td>
                    <td onClick = {() => keyType("U")} id = "key">U</td>
                    <td onClick = {() => keyType("I")} id = "key">I</td>
                    <td onClick = {() => keyType("O")} id = "key">O</td>
                    <td onClick = {() => keyType("P")} id = "key">P</td>
                </tr>
            </table>
            <table className = "keyboardMid">
                <tr id = "keyboardRow">
                    <td onClick = {() => keyType("A")} id = "key">A</td>
                    <td onClick = {() => keyType("S")} id = "key">S</td>
                    <td onClick = {() => keyType("D")} id = "key">D</td>
                    <td onClick = {() => keyType("F")} id = "key">F</td>
                    <td onClick = {() => keyType("G")} id = "key">G</td>
                    <td onClick = {() => keyType("H")} id = "key">H</td>
                    <td onClick = {() => keyType("J")} id = "key">J</td>
                    <td onClick = {() => keyType("K")} id = "key">K</td>
                    <td onClick = {() => keyType("L")} id = "key">L</td>
                </tr>
            </table>
            <table className = "keyboardLow">
                <tr id = "keyboardRow">
                    <td onClick = {() => keyType(1)} id = "key">GO</td>
                    <td onClick = {() => keyType("Z")} id = "key">Z</td>
                    <td onClick = {() => keyType("X")} id = "key">X</td>
                    <td onClick = {() => keyType("C")} id = "key">C</td>
                    <td onClick = {() => keyType("V")} id = "key">V</td>
                    <td onClick = {() => keyType("B")} id = "key">B</td>
                    <td onClick = {() => keyType("N")} id = "key">N</td>
                    <td onClick = {() => keyType("M")} id = "key">M</td>
                    <td onClick = {() => keyType(-1)} id = "key">BCK</td>
                </tr>
            </table>
        </main>
    )
}