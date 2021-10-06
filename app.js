
var num = 1;
let addBtn = document.getElementById("addBtn");
showNotes();

// function to add notes 
addBtn.addEventListener("click", function() {
   let addTxt = document.getElementById("addTxt");
   let addTitle = document.getElementById("addTitle");
   let notes = localStorage.getItem("notes");

   if (notes == null)
      notesObj = [];
   else
      notesObj = JSON.parse(notes);

   
   if(addTitle.value == ""){
      addTitle.value = "Untitled Note " + num;
      num++;
   }

   let myObj = {
      title: addTitle.value ,
      text: addTxt.value
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
      html += `<div ondblclick="imp(this)" class="noteCard my-2 mx-2 card" style="width: 18rem;">
                  <div class="card-body">
                     <h5 class="card-title"> ${element.title}</h5>
                     <p class="card-text"> ${element.text} </p>
                     <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                  </div>
               </div>`;
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
      if(cardTxt.includes(inputVal))
         element.style.display = "block";
      else
         element.style.display = "none";
   });

});

// Important notes 
function imp(card){

   console.log(card);

   if(card.classList.contains("imp")){
      card.classList.remove("imp");
      card.firstElementChild.firstElementChild.style.color = "#000";
   }
   else{
      card.classList.add("imp");
      card.firstElementChild.firstElementChild.style.color = "#fff";
   }
}

// navbar colors
let logo = document.getElementsByClassName("navbar-brand")[0];
logo.addEventListener("click", function(){
   let navbar = document.getElementsByClassName("navbar")[0];

   if(navbar.classList.contains("colors"))
      navbar.classList.remove("colors")
   else
      navbar.classList.add("colors")
});

