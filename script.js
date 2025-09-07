const cardCategories = document.getElementById("card-Categories");
const cardContainer = document.getElementById("card-container");
const addToCardContainer = document.getElementById("card-history");
const treeDetailsContainer = document.getElementById("tree-details");
const total = document.getElementById("total-amount");
let cardArray = [];
let cardTotal = 0;

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-section").classList.add("hidden");
  } else {
    document.getElementById("card-section").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const loadTrees = (id) => {
  manageSpinner(true)
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(response => response.json())
    .then(data => {
      removeActive()
      const categoryBtn = document.getElementById(`category-btn-${id}`)
      categoryBtn.classList.add("active")
      displayTrees(data.plants)
    })
}

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-Button");
  categoryButtons.forEach(button => button.classList.remove("active"))
}

const loadAllPlants = () => {
  manageSpinner(true)
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(package => displayTrees(package.plants))
}

loadAllPlants()

const displayTrees = (trees) => {
  cardContainer.innerHTML = "";
  for (const tree of trees) {
    cardContainer.innerHTML += `
        <div id="${tree.id}" class="bg-white p-3 rounded-lg space-y-2 shadow-lg flex flex-col">
                    <div class="">
                      <img class="rounded-lg max-h-40 w-full" src="${tree.image}" alt="">
                    </div>
                    <div class="mt-auto space-y-2">
                      <h3 class="font-semibold text-[#1F2937]">${tree.name}</h3>
                    <p class="text-sm text-[#71717A] line-clamp-2">${tree.description}</p>
                    <div class="flex items-center justify-between">
                      <span class="bg-gray-100 p-1 rounded-xl">${tree.category}</span>
                      <p class="font-semibold">$<span id="tree-price">${tree.price}</span></p>
                    </div>
                    <button id="${tree.id}" class="btn btn-success w-full rounded-3xl">Add to Card</button>
                    </div>
                  </div>
    `
  }
  manageSpinner(false)
}

const displayCategories = (categories) => {
  categories.forEach(category => {
    cardCategories.innerHTML += `
      <button id="category-btn-${category.id}" onclick="loadTrees(${category.id})" class="block btn hover:bg-[#04ed0040] w-full text-left category-Button">${category.category_name}</button>
    `
  });
}

cardContainer.addEventListener('click', (event) => {
  if (event.target.localName === "button") {
    const treeName = event.target.parentNode.children[0].innerText;
    const treePrice = event.target.parentNode.children[2].children[1].children[0].innerText;
    const treeId = event.target.parentNode.parentNode.id
    cardArray.push({
      title: treeName,
      price: Number(treePrice),
      id: treeId
    })
    cardTotal += Number(treePrice)
    cardArray.forEach(item => {
      addToCardContainer.innerHTML += `
      <div class="bg-gray-100 rounded-lg p-1" id="${treeId}">
        <div class="flex justify-between items-center">
          <div>
          <h4 class="font-semibold text-base mb-1">${item.title}</h4>
          <p class="text-gray-700">$<span>${item.price}</span></p>
        </div >
        <button class="delete-btn">❌</button>
      </div>
      </div>
    `
    })
    document.getElementById("total-container").classList.remove("hidden")
    total.innerText = cardTotal;
  }
  cardArray.pop();

  if (event.target.localName === "h3") {
    const treeId = event.target.parentNode.parentNode.id;
    fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
    .then(res => res.json())
    .then(pack => displayDetails(pack.plants))
  }
})

const displayDetails = (details) => {
  console.log(details)
  treeDetailsContainer.innerHTML = `
  <h3 class="text-lg font-bold">${details.name}</h3>
    <img class="max-h-60 w-full rounded-lg" src="${details.image}" />
    <p class="font-bold">Category: <span class="font-normal text-gray-600">${details.category}</span></p>
    <p class="font-bold">Price: <span class="font-normal text-gray-600">$${details.price}</span></p>
    <p class="font-bold">Description: <span class="font-normal text-gray-600">${details.description}</span></p>
  `
  document.getElementById("display_details").showModal()
} 

loadCategories();


addToCardContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const itemPrice = Number(e.target.parentNode.children[0].children[1].children[0].innerText)
    cardTotal -= itemPrice;
    e.target.parentNode.parentNode.remove()
    total.innerText = cardTotal;
  }
})
