let currentPuzzleId = "";
let currentPuzzle = null;

function loadPuzzle(id){

  currentPuzzle = puzzles[id];

  if(!currentPuzzle){
    alert("この問題はまだ未作成です");
    return;
  }

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  const size = currentPuzzle.size;
  const board = document.getElementById("board");

  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size}, 40px)`;

  for(let y=0; y<size; y++){
    for(let x=0; x<size; x++){

      const cell = document.createElement("input");
      cell.maxLength = 1;
      cell.className = "cell";

      const ans = currentPuzzle.grid[y][x];

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
            cell.classList.remove("wrong","correct");
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

  document.getElementById("status").textContent = "";
}

function checkClear(){

  const cells = document.querySelectorAll(".cell:not(.black)");
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
   <p>おめでとう！</p>i
  </div>
 `;

 localStorage.setItem(currentPuzzleId,true);
 updateButtons();
}
}

function backMenu(){
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
}
function updateButtons(){

 const buttons = document.querySelectorAll("button[data-puzzle]");

 buttons.forEach(btn=>{

  const id = btn.dataset.puzzle;

  if(localStorage.getItem(id)){
   btn.textContent = id + " ✔";
  }

 });
}

updateButtons();
