document.addEventListener("DOMContentLoaded", (event) => {

  const app = document.getElementById('wrapper');

  // const logo = document.createElement('img');
  // logo.src = 'logo.png';

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  app.appendChild(container);

  var request = new XMLHttpRequest();
  request.open('GET', 'data.json', true);
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      var countCols = 0;
      var images = [];
      images = data.mundos[0].items;

      var cells = [];
      var cells2 = [];
      images.forEach(image => {

        var cell = document.createElement('span');

        var img = document.createElement('img');
        img.setAttribute('src', 'https://falabella.scene7.com/is/image/FalabellaPE/'+image.image+'?scl=1')
        if(image.width === "1"){
          cell.setAttribute('class', 'col1');
          img.setAttribute('width', '24%');
        }else{
          cell.setAttribute('class', 'col2');
          img.setAttribute('width', '50%');
        }

        var link = document.createElement('a');
        link.setAttribute('href', image.url)
        link.setAttribute('target', '_blank')
        link.appendChild(img)
        cell.appendChild(link);

        //columns grid
        countCols += parseInt(image.width);
        if(countCols <= 4){
          cells.push(cell.outerHTML);
          if(countCols == 4){
            var res = cells.join('');
            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.insertAdjacentHTML('beforeend', res);
            container.appendChild(row);
            countCols = 0;
            cells = [];
          }
        }

      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = 'Ocurrio un error al intentar cargar la data';
      app.appendChild(errorMessage);
    }
  }

  request.send();


});