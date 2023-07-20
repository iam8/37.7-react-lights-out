import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
function Board({ nrows=6, ncols=6, chanceLightStartsOn=0.5 }) {
    const [board, setBoard] = useState(createBoard());

    /**
     * Randomly return true or false, with chance of returning true set by chanceTrue
     * (float between 0.0 and 1.0, inclusive).
     */
    function makeChoiceTrueFalse(chanceTrue) {
        return Math.random() < chanceTrue;
    }

    /** Create a JS board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];

        for (let i = 0; i < nrows; i++) {
            const row = [];
            for (let j = 0; j < ncols; j++) {
                row.push(makeChoiceTrueFalse(chanceLightStartsOn));
            }

            initialBoard.push(row);
        }

        return initialBoard;
    }

    /**
     * Return true if player has won (all lights on board are off), and false otherwise.
     */
    function hasWon() {
        return board.every((row) => {
            return row.every((value) => {
                return !value;
            });
        });
    }

    /**
     * Flip cell at given coordinates and the cells immediately above, below, to the left, and to
     * the right of it.
     *
     * Parameters:
     * - coord: a string representing cell coordinates ("row#-column#').
     *
     * Return: an updated copy of the JSX game board.
     */
    function flipCellsAround(coord) {
        setBoard((oldBoard) => {
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {

                // If this coord is actually on board, flip it
                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };

            // Make a (deep) copy of the oldBoard
            const boardCopy = oldBoard.map((row) => [...row]);

            // In the copy, flip this cell and the cells around it
            const targetCoords = [
                [y, x],
                [y+1, x],
                [y-1, x],
                [y, x+1],
                [y, x-1]
            ];

            for (let [y, x] of targetCoords) {
                flipCell(y, x, boardCopy);
            }

            // Return the copy
            return boardCopy;
        });
    }

    // Display simple message when game is won
    if (hasWon()) {
        return <div>You won!</div>;
    }

    // Make table JSX board
    return (
        <table>
            <tbody>
                {board.map((row, nrow) => {
                    return (
                        <tr key={nrow}>
                            {row.map((value, ncol) => {
                                const coords = `${nrow}-${ncol}`;
                                return (
                                    <Cell
                                        key={coords}
                                        flipCellsAroundMe={() => {flipCellsAround(coords)}}
                                        isLit={value}
                                    />
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default Board;
