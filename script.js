let currentPuzzle = null;
let currentPuzzleId = "";

function loadPuzzle(id){

  currentPuzzleId = id;

  currentPuzzle = puzzles[id];

  if(!currentPuzzle){
    alert("この問題はまだありません");
    return;
  }

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  const size = currentPuzzle.size;

  const board = document.getElementById("board");

  board.innerHTML = "";

  board.style.gridTemplateColumns =
    `repeat(${size}, 30px)`;

  for(let y=0; y<size; y++){

    for(let x=0; x<size; x++){

      const ans = currentPuzzle.grid[y][x];

      const cell = document.createElement("input");

      cell.maxLength = 1;

      cell.className = "cell";

      if(ans === " "){

        cell.disabled = true;

        cell.classList.add("black");

      }else{

        cell.oninput = function(){

          const value = cell.value;

          if(value === ans){

            cell.classList.remove("wrong");

            cell.classList.add("correct");

          }else if(value === ""){

            cell.classList.remove("wrong");
            cell.classList.remove("correct");

          }else{

            cell.classList.remove("correct");

            cell.classList.add("wrong");

          }

          checkClear();
        };

      }

      board.appendChild(cell);

    }

  }

  showClues();

  document.getElementById("status").innerHTML = "";
}

function showClues(){

  const clues = currentPuzzle.clues;

  let html = "<h3>ヒント</h3>";

  html += "<b>よこ</b><br>";

  clues.horizontal.forEach(clue=>{

    html += clue + "<br>";

  });

  html += "<br><b>たて</b><br>";

  clues.vertical.forEach(clue=>{

    html += clue + "<br>";

  });

  document.getElementById("clues").innerHTML = html;
}

function checkClear(){

  const cells =
    document.querySelectorAll(".cell:not(.black)");

  let ok = true;

  cells.forEach(cell=>{

    if(!cell.classList.contains("correct")){
      ok = false;
    }

  });

  if(ok){

    document.getElementById("status").innerHTML = `
      <div class="clear-box">
        <h2>クリア！</h2>
        <p>おめでとう！</p>
      </div>
    `;

    localStorage.setItem(currentPuzzleId,true);

    updateButtons();
  }

}

function updateButtons(){

  const buttons =
    document.querySelectorAll("button[data-puzzle]");

  buttons.forEach(btn=>{

    const id = btn.dataset.puzzle;

    if(localStorage.getItem(id)){

      btn.textContent =
        id + " ✔";

    }

  });

}

function backMenu(){

  document.getElementById("menu")
    .classList.remove("hidden");

  document.getElementById("game")
    .classList.add("hidden");

}

updateButtons();
