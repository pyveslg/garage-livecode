import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList", "input"]

  connect() {
    this.garageName = "super-garage-996"
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    fetch(this.garageUrl)
    .then(response => response.json())
    .then((data) => {
      this.carsListTarget.innerHTML = ""
      data.forEach(car => this._insertCarCard(car))
    });
  }


  // 1. Je crée une méthode createCar dans mon controller ✅
  createCar(event) {
    event.preventDefault();
    // 2. Récupérer mes inputs
    const data = {};
    // 3. Lire la valeur présente dans chacun des mes inputs et constuire le body
    this.inputTargets.forEach((input) => {
      data[input.name] = input.value;
    })
    // 4. Je fais ma requête à l'API (post pour create a car)
    fetch(`https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then((data) => {
      // 5. J'insére la nouvelle carte de la voiture
      this._insertCarCard(data);
    })


  }

  _insertCarCard(car) {
      const carCard = `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/300/300/${car.brand}%20${car.model}">
        </div>
        <div class="car-info">
          <h4>${car.brand} - ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
        </div>
      </div>`
      this.carsListTarget.insertAdjacentHTML('beforeend', carCard)
  }



}
