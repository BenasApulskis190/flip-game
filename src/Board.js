import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightOn: 0.25,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // board.push()
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(Math.random() < this.props.chanceLightOn)
      }
      board.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {nRows, nCols} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[y][x] = !board[y][x];

      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board: board, hasWon: hasWon})

  }


  /** Render game board or winning message. */

  render() {
    let tableBord = [];
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        let cord = `${y}-${x}`;
        row.push(
          <Cell key={cord}
                isLit={this.state.board[y][x]}
                flipCellsAroundMe={() => this.flipCellsAround(cord)}
          />
        );
      }
      tableBord.push(<tr key={y}>{row}</tr>);
    }

    return (
      <table className='Board'>
        <tbody>{tableBord}</tbody>
      </table>
    );
  }
}


export default Board;
