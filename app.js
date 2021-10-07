
var num = 1;
let addBtn = document.getElementById("addBtn");
showNotes();

if(localStorage.getItem("bg") == 1)
   document.body.classList.add("background");

if(localStorage.getItem("color") == 1){
   document.getElementsByClassName("navbar")[0].classList.add("colors");
   document.getElementsByTagName("footer")[0].classList.add("colors");
}

// function to add notes 
addBtn.addEventListener("click", function() {
   let addTxt = document.getElementById("addTxt");
   let addTitle = document.getElementById("addTitle");
   let notes = localStorage.getItem("notes");

   if (notes == null){
      notesObj = [];
      alert("Double click/tap on notes to mark as important!");
   }
   else{
      notesObj = JSON.parse(notes);
   }
   
   if(addTitle.value == ""){
      addTitle.value = "Untitled Note " + num;
      num++;
   }

   let myObj = {
      title: addTitle.value ,
      text: addTxt.value,
      important: false
   }
   
   notesObj.push(myObj);
   localStorage.setItem("notes", JSON.stringify(notesObj));
   addTxt.value = "";
   addTitle.value = "";

   //console.log(notesObj);
   showNotes();
});

// function to show elements form localStorage
function showNotes(){
   let notes = localStorage.getItem("notes");

   if (notes == null)
      notesObj = [];
   else
      notesObj = JSON.parse(notes);

   let html = "";

   notesObj.forEach(function(element, index) {
      if(element.important){
         html += `<div ondblclick="imp(this, ${index})" class="noteCard my-2 mx-2 card imp" style="width: 18rem;">
                     <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text} </p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                     </div>
                  </div>`;
      }
      else{
         html += `<div ondblclick="imp(this, ${index})" class="noteCard my-2 mx-2 card" style="width: 18rem;">
                     <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text} </p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                     </div>
                  </div>`;
      }
   });

   let notesEle = document.getElementById("notes");
   if(notesObj.length != 0)
      notesEle.innerHTML = html;
   else
      notesEle.innerHTML = `Nothing to Show. Please add a note using "Add a Note" section.`;

}

// Fuction to delete notes 
function deleteNote(index){
   //console.log("let's delete note " + index);

   let notes = localStorage.getItem("notes");
   if (notes == null)
      notesObj = [];
   else
      notesObj = JSON.parse(notes);

   notesObj.splice(index, 1);
   localStorage.setItem("notes", JSON.stringify(notesObj));
   showNotes();

}

// Search notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
   let inputVal = search.value.toLowerCase();
   
   //console.log("Input field fired!");

   let notecards = document.getElementsByClassName("noteCard");
   Array.from(notecards).forEach(function(element){
      let cardTxt = element.getElementsByTagName("P")[0].innerText.toLowerCase();
      let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
      if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal))
         element.style.display = "block";
      else
         element.style.display = "none";
   });

});

// Important notes 
function imp(card, index){
   //console.log(card);

   let notes = localStorage.getItem("notes");
   notesObj = JSON.parse(notes);

   //console.log(index)

   if(card.classList.contains("imp")){
      card.classList.remove("imp");
      card.getElementsByTagName('h5')[0].style.color = "#000";
      card.getElementsByTagName('p')[0].style.color = "#000";
      notesObj[index].important = false;
   }
   else{
      card.classList.add("imp");
      card.getElementsByTagName('h5')[0].style.color = "#fff";
      card.getElementsByTagName('p')[0].style.color = "#fff";
      notesObj[index].important = true;
   }

   localStorage.setItem("notes", JSON.stringify(notesObj));

}

// navbar & footer colors
let logo = document.getElementsByClassName("navbar-brand")[0];
logo.addEventListener("click", function(){
   let navbar = document.getElementsByClassName("navbar")[0];
   let footer = document.getElementsByTagName("footer")[0];

   if(navbar.classList.contains("colors")){
      navbar.classList.remove("colors");
      footer.classList.remove("colors");
      localStorage.setItem("color", 0);
   }
   else{
      navbar.classList.add("colors");
      footer.classList.add("colors");
      localStorage.setItem("color", 1);
   }
});

// background toogle
let bg = document.getElementById("bg");
bg.addEventListener("click", function(){
   let body = document.body;

   if(body.classList.contains("background")){
      body.classList.remove("background");
      localStorage.setItem("bg", 0);
   }
   else{
      body.classList.add("background");
      localStorage.setItem("bg", 1);
   }

});
