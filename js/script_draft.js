import { users } from './data.js';

//retrieve data
let users;

//add email & prepare users list


fetch('js/data.json')
  .then(response => response.json())
  .then(data => {
    // Convert the JSON object to a string and display it in the HTML element
    users = data;
    
    users.forEach(user => {
        user.email = insertEmail(user.name);    
    });

  })
  .catch(error => {
    console.log('Error:', error);
  });

  function insertEmail(name){
    return name.toLowerCase().replace(' ', '.') + '@example.com'
}

//update no. of contacts
let contactsTotal = document.querySelector('#contacts-total')
contactsTotal.innerText = `Total: ${users.length}`
console.log(contactsTotal.innerText)

//display users info
let contactList = document.querySelector('.contact-list');

//-- remove original items
while (contactList.firstChild) {
    contactList.removeChild(contactList.firstChild);
}

//display users  
function displayUsers(users){

    users.forEach(user => {
        const listItem = document.createElement('li');
            listItem.classList.add('contact-item', 'cf');
    
        const contactDetails = document.createElement('div');
            contactDetails.classList.add('contact-details')
            
            const contactImage = document.createElement('img');
                contactImage.classList.add('avatar');
                contactImage.src = user.image;

            const contactHeader = document.createElement('h3');
                contactHeader.innerText = user.name;

            const contactEmail = document.createElement('span');
                contactEmail.classList.add("email");
                contactEmail.innerText = user.email;
            
            contactDetails.appendChild(contactImage);
            contactDetails.appendChild(contactHeader);
            contactDetails.appendChild(contactEmail);
            listItem.appendChild(contactDetails)
        
        const joinedDetails = document.createElement('div');
            joinedDetails.classList.add('joined-details');
            
            const joinDate = document.createElement('span');
                joinDate.classList.add("date");
                joinDate.innerText = `Joined ${user.joined}`;
            
            joinedDetails.appendChild(joinDate);
            listItem.appendChild(joinedDetails)
        
        // console.log(listItem)
        contactList.appendChild(listItem);
    });

    console.log(contactList);

}

//check users length for pagination
const pagination = document.getElementsByClassName("pagination")[0];
// const pagination = document.querySelector('.pagination')

let paginationLimit = 10;
let pageCount = Math.ceil(users.length / paginationLimit);
// console.log(`pageCount = ${pageCount}`);
let currentPage =1; //default
//contactList - defined

//set paginationList
if (pageCount > 1){
        for (let i=1; i<=pageCount; i++){
        const page = document.createElement('li');
        
        if (i==1){
            page.innerHTML = `<a href="" class="active">${i}</a>`; //set 1 default active
        }
        else{
            page.innerHTML = `<a href="" class="inactive">${i}</a>`; //set class inactive
        }
        
        pagination.appendChild(page);
    }
}

//display all Users
displayUsers(users);

//display users for the page
let contactItems = document.querySelectorAll('.contact-list .contact-item');

//set displayItems with pageLimit
function displayItems(pageNum){
    currentPage = pageNum;

    let thisPageIndex = (pageNum-1) * paginationLimit; //1 = 0
    let nextPageIndex = pageNum * paginationLimit; //1 = 10
    // console.log(`Display Range Index = ${thisPageIndex} - ${nextPageIndex}`)

    contactItems.forEach((contact, index) => {
        contact.hidden = true;
        if (index >= thisPageIndex && index < nextPageIndex){
            contact.hidden = false;
        }
    })
}

displayItems(1); //default = page 1

//set Current Page
pagination.addEventListener("click", setCurrentPage);

function setCurrentPage(event){
    event.preventDefault();
    
    //set all as inactive
    const links = document.querySelectorAll('a')
    links.forEach((link) =>{
        link.classList.replace('active', 'inactive')
    })

    if (event.target.tagName == 'A') {
        currentPage = event.target.innerText
        event.target.classList.replace('inactive', 'active')
    }
    console.log(`currentPage = ${currentPage}`);
    displayItems(currentPage);
}



