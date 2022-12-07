// write your code here
let img = document.querySelector("#ramen-menu");
let imgDetail = document.querySelector(".detail-image");
let ramenName = document.querySelector(".name");
let resName = document.querySelector(".restaurant")
let rating = document.querySelector("#rating-display");
let comment = document.querySelector("#comment-display")


fetch('http://localhost:3000/ramens')
.then(response => {return response.json()})
.then(data => getRamenImage(data))


//function to iterate through ramen object an retrieve images
function getRamenImage(data) {
    //for each for iteration
    data.forEach(ramen => {
        let new_img = document.createElement('img');
        new_img.src = ramen.image;
        img.appendChild(new_img);
        //Click event to listen to a click on the image
        new_img.addEventListener('click', () => displayRamenDetails(ramen));
        
    });
}



//function to display ramen details
function displayRamenDetails(ramen) {
    //replacing html tags with data from the API
    imgDetail.src = ramen.image;
    ramenName.textContent = ramen.name;
    resName.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;

}

//selecting new ramen div element
const ramenForm = document.querySelector("#new-ramen");
//adding an event listener to the submit event
ramenForm.addEventListener("submit",function (event) {
    event.preventDefault();
    const newName = document.querySelector("#new-name").value;
    const newRes = document.querySelector("#new-restaurant").value;
    const newImg = document.querySelector("#new-image").value;
    const newRating = document.querySelector("#new-rating").value;
    const newComment = document.querySelector("#new-comment").value;
    fetch("http://localhost:3000/ramens", {
        method: "post",
        body: JSON.stringify({
            name: newName,
            restaurant: newRes,
            image: newImg,
            rating: newRating,
            comment: newComment
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }) 

    .then(resp => resp.json())
    .then(data => {
        const image = getRamenImage(data.image);
        //display details when user clicks on newly added image
        image.addEventListener("click", function() {
            
            displayRamenDetails(data);
            });      
    });
})

   