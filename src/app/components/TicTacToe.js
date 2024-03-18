'use client';

import { useState } from 'react';
import './tictactoe.css';

function Square({value, onSquareClick})
{
    return <span className="box1"
                    onClick={onSquareClick}>
            {value}
    </span>
}

function calculateWinner(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const[a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Player({xIsNext})
{
    if (xIsNext) {
        return (<div className="player">
            <span className="xturn active">X's turn</span>
            <span className="oturn">O's turn</span>
            <div className="slider"></div>
        </div>);
    } else {
        return (<div className="player active">
            <span className="xturn">X's turn</span>
            <span className="oturn active">O's turn</span>
            <div className="slider"></div>
        </div>);
    }
}

export default function TicTacToe()
{
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const winner = calculateWinner(squares);

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = [...squares];
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const replayHandler = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    if (winner) {
        return (<div className="container">
            <div className="result-box">
                <h1 className="won-text">Player {winner} won the game!</h1>
                <div className="btn">
                    <button type="button"
                            onClick={replayHandler}>Replay</button>
                </div>
            </div>
        </div>);
    } else {
        return (<div className="container">
            <div className="playboard">
                <div className="detail">
                    <Player xIsNext={xIsNext}/>
                </div>
                <div className="play-area">
                    <section>
                        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
                        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
                        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
                    </section>
                    <section>
                        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
                        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
                        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
                    </section>
                    <section>
                        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
                        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
                        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
                    </section>
                </div>
            </div>
        </div>);
    }
}
