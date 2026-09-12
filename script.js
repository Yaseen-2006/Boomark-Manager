const form = document.getElementById('myForm');
const Bookmarks = document.getElementById('boomark-collection');

const STORAGE_KEY = 'bookmarks';

// Get bookmarks array from localStorage (or empty array if none)
function getBookmarks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save bookmarks array back to localStorage
function saveBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

// Render all bookmarks from storage into the DOM
function renderBookmarks() {
    const bookmarks = getBookmarks();

    Bookmarks.innerHTML = bookmarks.map((data, index) => `
        <div class="bookamrk">
            Bookmark : <a target="_blank" href="${data.url}">${data.name}</a>
            <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
    `).join('');
}

function takeAction(data) {
    if (data.name != "" && data.url != "") {

        const bookmarks = getBookmarks();
        bookmarks.push(data);
        saveBookmarks(bookmarks);

        renderBookmarks();

        setTimeout(() => {
            alert("Bookmark Added Successfully.")
        }, 50);

    } else {
        alert("Please Enter a valid value")
    }
}

function removeBookmark(index) {
    const confirmed = confirm("Are you sure you want to delete this bookmark?");
    if (confirmed) {
        const bookmarks = getBookmarks();
        bookmarks.splice(index, 1);
        saveBookmarks(bookmarks);
        renderBookmarks();
    }
}

// 2. Listen for the submit event
form.addEventListener('submit', function(event) {
  // 3. Stop the browser from reloading the page
  event.preventDefault();

  // 4. Automatically gather all the form fields
  const formData = new FormData(form);

  // 5. Convert the form data into a standard JavaScript object
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  // 6. TAKE ACTION ON THE DATA
  takeAction(data);
  form.reset();
});

// Handle remove button clicks (event delegation, since buttons are added dynamically)
Bookmarks.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        removeBookmark(index);
    }
});

// Load and display any saved bookmarks when the page first loads
renderBookmarks();