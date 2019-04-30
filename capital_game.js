// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
//document.write("<script src='./country_capital_pairs.js'></script>");
window.onload = function(){
$( document ).ready(function() {
  var country_capital_pairs = pairs
});

divs=document.getElementById("pr2__question");

capitallist=[];
for(var a=0;a<pairs.length;a++){
  capitallist.push(pairs[a].capital);
}


function deleteRow(r) {
  console.log("d");
  var i = r.parentNode.parentNode.rowIndex;
  answers.splice(i);
  refreshList();
}


function getRandomInt(len) {
      return Math.floor(Math.random() * (len + 1));
}

function fillContent(divObj, content) {
  divObj.innerHTML = content
}

function refreshOptions() {
  var Q = -1;
  Q = getRandomInt(pairs.length);
  fillContent(divs, pairs[Q].country);
}

function onclickEvents() {
  var btn = document.getElementById("pr2__submit");
  var abtn = document.getElementById("all");
  var cbtn = document.getElementById("onlycorrect");
  var wbtn = document.getElementById("onlywrong");

  document.getElementById("pr2__answer").addEventListener("keydown", function(e) {

    // Enter is pressed
    if (e.keyCode == 13) {
      var textBox = document.getElementById("pr2__answer");
      answers.push([$("#pr2__question").text(),textBox.value]);
      if(answers[answers.length-1][1].toLowerCase()==realanswer(answers[answers.length-1][0]).toLowerCase()){
        correctlist.push([$("#pr2__question").text(),realanswer(answers[answers.length-1][0]),answers.length-1]);
        if(document.getElementById("onlywrong").checked){
          document.getElementById("all").checked = true;
        }
      }else{
        wronglist.push([$("#pr2__question").text(),textBox.value,answers.length-1]);
        if(document.getElementById("onlycorrect").checked){
          document.getElementById("all").checked = true;
        }
      }
      textBox.value = '';
      refreshOptions();
      refreshList();
     }
}, false);


  btn.onclick = function() {
    var textBox = document.getElementById("pr2__answer");
    answers.push([$("#pr2__question").text(),textBox.value]);
    if(answers[answers.length-1][1].toLowerCase()==realanswer(answers[answers.length-1][0]).toLowerCase()){
      correctlist.push([$("#pr2__question").text(),realanswer(answers[answers.length-1][0]),answers.length-1]);
      if(document.getElementById("onlywrong").checked){
        document.getElementById("all").checked = true;
      }
    }else{
      wronglist.push([$("#pr2__question").text(),textBox.value,realanswer(answers[answers.length-1][0]),answers.length-1]);
      if(document.getElementById("onlycorrect").checked){
        document.getElementById("all").checked = true;
      }
    }
    textBox.value = '';
    refreshOptions();
    refreshList();
  }

  abtn.onclick = function() {
    refreshList();
  }
  cbtn.onclick = function() {
    refreshList();
  }
  wbtn.onclick = function() {
    refreshList();
  }

}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
}

answers = [];
correctlist=[];
wronglist=[];

function realanswer(a) {
  for(var j=0;j<pairs.length;j++) {
    if(a == pairs[j].country) {
      return pairs[j].capital;
    }
  }
}

function refreshList() {

      $("#quizs tbody tr").remove()
      if(document.getElementById("all").checked){
        for(var i=answers.length-1;i>=0;i--) {
          if(answers[i][1].toLowerCase()==realanswer(answers[i][0]).toLowerCase()){
            $("#quizs tbody")
                .append($('<tr>')
                    .append($('<td>').text(answers[i][0]))
                    .append($('<td>').text(realanswer(answers[i][0])))
                    .append($('<td>').html("<i class='fa fa-check'></i> <button id='deletebtn'>Delete</button>"))
                  );
          }else{
            $("#quizs tbody")
                .append($('<tr>')
                    .append($('<td>').text(answers[i][0]))
                    .append($('<td>').html(answers[i][1].strike()))
                    .append($('<td>').text(realanswer(answers[i][0])).append("<button id='deletebtn'>Delete</button>"))
                    // .html("<button>Delete</button>"))
                  );
          }
                }

        var list = document.getElementsByTagName("TBODY")[0];
        var list2 = list.getElementsByTagName("TR");
        for(var i = 0; i<list2.length; i++){
            if(answers[i][1].toLowerCase()==realanswer(answers[i][0]).toLowerCase()){
              list2[list2.length-i-1].className = "correct";
            }else{
              list2[list2.length-i-1].className = "wrong";
            }
          }


      }else if (document.getElementById("onlycorrect").checked) {

                for(var i=correctlist.length-1;i>=0;i--) {
                    $("#quizs tbody")
                        .append($('<tr>')
                            .append($('<td>').text(correctlist[i][0]))
                            .append($('<td>').text(realanswer(correctlist[i][0])))
                            .append($('<td>').html("<i class='fa fa-check'></i> <button id='deletebtn'>Delete</button>"))
                          );

                        }

                var list = document.getElementsByTagName("TBODY")[0];
                var list2 = list.getElementsByTagName("TR");
                for(var i = 0; i<list2.length; i++){
                  list2[list2.length-i-1].className = "correct";
                }

      }else{
        for(var i=wronglist.length-1;i>=0;i--) {
            $("#quizs tbody")
                .append($('<tr>')
                    .append($('<td>').text(wronglist[i][0]))
                    .append($('<td>').html(wronglist[i][1].strike()))
                    .append($('<td>').text(realanswer(wronglist[i][0])).append("<button id='deletebtn'>Delete</button>"))
                  );

                }

        var list = document.getElementsByTagName("TBODY")[0];
        var list2 = list.getElementsByTagName("TR");
        for(var i = 0; i<list2.length; i++){
          list2[list2.length-i-1].className = "wrong";
        }      }


        }


        


        $( function() {

            $( "#pr2__answer" ).autocomplete({
              source: capitallist
            });
          } );







// Set the cursor position of the "#test-input" element to the end when the page loads
var input = document.getElementById('pr2__answer');
setCaretPosition(input, input.value.length);


refreshOptions();
onclickEvents();
refreshList();
}
