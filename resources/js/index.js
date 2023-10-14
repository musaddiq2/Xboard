const getId = () =>Math.random().toString(36).substring(2,9);


const getaccordionItem = (title,id) => {
  return `
    <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button
        class="btn accordion-button"
        aria-expanded="true"
        type="button"       
        data-bs-toggle="collapse"
        data-bs-target="#collapse${id}"       
        aria-controls="collapse${id}">
        ${title}
      </button>
    </h2>
    <div
      id="collapse${id}"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionID"
      aria-labelledby="heading${id}"   
    >
    
    </div>
  </div>`;
};

const getCarouselOuter = (id,innerId) => {
  return `
    <div id="carouselControls${id}" class="carousel slide">
  <div class="carousel-inner" id="${innerId}">  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
};
const getCarouselItem = (id, active) => {
  return `
<div class="carousel-item ${active ? "active" : ""}" id="${id}"></div>

`;

};
let getCard = (item) => {
  return `
    <div class="card d-block" >
  <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
    <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
    <p class="card-text">${item["description"]}</p>
    <a href="${item["link"]}" class="card-link"></a>
 
  </div>
</div>`;
};
const addContent = async () => {
  for (let i = 0; i < magazines.length; i++) {
    let url = magazines[i];
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
    );
    const data = await response.json();
    const accordionItemId = getId();
    console.log(accordionItemId,"SSSSSW@@@@@@@@@")
    const accordionItem = getaccordionItem(data.feed.title, accordionItemId);
    document.getElementById("accordionID").innerHTML += accordionItem;

    // Show Carousel By Default
    if (i === 0) {
      document
        .getElementById(`collapse${accordionItemId}`)
        .classList.add("show");
    }
    

    // create Carousel
    const carouselId = getId();
    const carouselInnerId = getId();
    const carousel = getCarouselOuter(carouselId, carouselInnerId);
    document.getElementById(`collapse${accordionItemId}`).innerHTML += carousel;

    //add Cards In Carousel
    const items = data.items;
    console.log(items);

    for (const itemIdx in items) {
      const carouselItemId = getId();
      
      const carouselItem = getCarouselItem(carouselItemId, itemIdx == 0);
      document.getElementById(carouselInnerId).innerHTML += carouselItem;

      const card = getCard(items[itemIdx]);
      document.getElementById(carouselItemId).innerHTML = card;
    }

  }
};
addContent();
