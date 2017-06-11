// register modal component
Vue.component('modal', {
  template: '#modal-template'
})

var emptyCells = function(board) {
  var emptyArr = [];
  board.forEach(function(cell, index){
    if (cell === "") {
      emptyArr.push(index);
    }
  });
  return emptyArr;
};

var computerPlay = function(board) {
    var emptyArr = emptyCells(board);
    var index = Math.floor(Math.random()*emptyArr.length);
    return emptyArr[index];
};


var app = new Vue({
  el: "#game",
  data: {
    showModal: true,
    turn: "o", // it can be either "o" or "x"
    board: ["", "", "",
            "", "", "",
            "", "", ""],
    human: "o", // that is for the human to select whether to use o or x
    result: "running" //it could be "running", "AI wins", "AI wins", "draw"
  },
  computed: {
    giveInstruction: function() {
      var self = this;
      if (this.result === "running") {
        return this.turn + "'s turn"
      }else {
        var restart = window.setTimeout(function(){
          self.board = ["", "", "",
                  "", "", "",
                  "", "", ""];
          self.turn = self.human;
          self.result = "running";
          console.log("234");
        }, 2000)
        console.log("123");
        return this.result + ". The game will restart soon";

      }
    },
    output: function() {
      console.log("123");
    }
  },
  methods: {
    insertAt: function(index){
      if (this.turn === this.human && this.result === "running") {
        if (this.board[index] === "") {
          this.board.splice(index, 1, this.turn);
          this.turn = this.turn === "o"?"x":"o";
          isTerminal(this.board);

          //select a random place to play
          if (this.result === "running") {
            aiPlay();
          }
        }
      }else if(this.turn !== this.human && this.result === "running") {
        aiPlay()
      }

    },
    chooseO: function() {
      this.human = "o"
      this.turn = "o"
      this.showModal = false;
    },
    chooseX: function() {
      this.human = "x";
      this.turn = "x";
      this.showModal = false;
    }
  },

});

var init = function() {

};

var isTerminal = function(board) {
  var B = board;

  //check rows
  for(var i = 0; i <= 6; i = i + 3) {
      if(B[i] !== "" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
          app.result = B[i] + "-won"; //update the state result
      }
  }

  //check columns
  for(var i = 0; i <= 2 ; i++) {
      if(B[i] !== "" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
          app.result = B[i] + "-won"; //update the state result
      }
  }

  //check diagonals
  for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(B[i] !== "" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
          app.result = B[i] + "-won"; //update the state result
      }
  }

  var available = computerPlay(board);
  if(available.length == 0) {
      //the game is draw
      app.result = "draw"; //update the state result
  }
  else {
  }
};

var aiPlay = function() {
  var cellSelectedByAI = computerPlay(app.board);
  app.board.splice(cellSelectedByAI, 1, app.turn);
  app.turn = app.turn === "o"? "x":"o";
  isTerminal(app.board);
};
