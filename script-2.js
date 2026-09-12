
const form = document.getElementById('myForm');
const Bookmarks = document.getElementById('boomark-collection');



function takeAction(data) {
    if (data.name != "" && data.url != "") {
        
        Bookmarks.innerHTML += `<div class="bookamrk">Bookmark : <a target="_blank" href="${data.url}">${data.name}</a><button class="rm-btn">remove</button></div>` ;

        let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];

        // Add new bookmark
        saved.push(data);

        // Save back to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(saved));

        setTimeout(() => {
            alert("Bookmark Added Successfully.")
        }, 50);
        
    } else {
        alert("Please Enter a valid value")
    }
}

let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];

saved.forEach(data => {
    Bookmarks.innerHTML += `
        <div class="bookamrk">
            Bookmark : 
            <a target="_blank" href="${data.url}">${data.name}</a>
        <button class="rm-btn">remove</button></div>`;
});


//  --- Make Remove button Functional : 

Bookmarks.addEventListener('click', function(event) {
    if (event.target.classList.contains('rm-btn')) {

        const bookmarkDiv = event.target.closest('.bookamrk');

        // Find this div's position among all .bookamrk divs currently shown
        const allBookmarkDivs = Array.from(Bookmarks.querySelectorAll('.bookamrk'));
        const index = allBookmarkDivs.indexOf(bookmarkDiv);

        const confirmed = confirm("Are you sure you want to delete this bookmark?");

        if (confirmed) {
            // Remove from localStorage
            let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
            saved.splice(index, 1);
            localStorage.setItem("bookmarks", JSON.stringify(saved));

            // Remove from DOM
            bookmarkDiv.remove();
        }
    }
});

// 2. Listen for the submit event
form.addEventListener('submit', function(event) {
  // 3. Stop the browser from reloading the page
  event.preventDefault();

  // 4. Automatically gather all the form fields
  const formData = new FormData(form);

  // 5. Convert the form data into a standard JavaScript object
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  
  // Log the resulting data object:
//   console.log(data.name, data.url);

  // 6. TAKE ACTION ON THE DATA
  takeAction(data);
  form.reset();
});


