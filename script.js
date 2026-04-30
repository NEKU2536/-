let currentPuzzle = null;
let answers = [];

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
  board.style.gridTemplateColumns = `repeat(${size}, 34px)`;

  answers = [];

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
            if(value !== ""){
    let next = cell.nextElementSibling;

    while(next && next.classList.contains("black")){
      next = next.nextElementSibling;
    }
cell.onkeydown = function(e){
  if(e.key === "Backspace" && cell.value === ""){
    let prev = cell.previousElementSibling;

    while(prev && prev.classList.contains("black")){
      prev = prev.previousElementSibling;
    }

    if(prev){
      prev.focus();
    }
  }
};
    if(next){
      next.focus();
    }
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
    document.getElementById("status").textContent = "クリア！";
  }
}

function backMenu(){
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
}
