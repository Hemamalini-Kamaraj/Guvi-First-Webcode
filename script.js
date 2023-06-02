async function getNameData(nameInput) {
    try{
        let response = await fetch(`https://api.nationalize.io?name=${nameInput}`);
        let data = response.json();
        return data;

    } catch(error) {
        console.error('error')
    }
}

let outerContainer = createElements('div','container mt-5')

let row1 = createElements('div','row bg-secondary');
let header = createElements('h3','header text-center');
header.textContent = "Nationality Finder Based on the Name";

let row2 = createElements('div','row');

let formDiv = createElements('div','form-row mt-3 fs-4 text-center');
let form = createElements('form','form-control col-auto');
let input = createElements('input','form-control search');
input.setAttribute('placeholder','Please Enter the Valid Name..!');
input.setAttribute('type','text');
input.setAttribute('id','myInput')
input.onkeyup = async function() {
    let input = document.getElementById('myInput');
      let filter = input.value.toUpperCase();
      let ul1 = document.getElementById("myUL");
      let li =ul1.getElementsByTagName('li');
      console.log(ul1)
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = " ";
          li[i].style.visibility = 'visible'
        } else {
          li[i].style.display = "none";
        }
      }
}

let listDiv = createElements('div','row listDiv m-2');
let list = createElements('ul','the-list');
list.setAttribute('style','list-style-type: none; background-color:beige ;visibility:hidden')
list.setAttribute('id','myUL');
list.innerHTML = `
            <li class="list-items"><a>Hema</a></li>
            <li class="list-items"><a>Banu</a></li>
            <li class="list-items"><a>Charu</a></li>
            <li class="list-items"><a>Saravanan</a></li>
            <li class="list-items"><a>Aaraa</a></li>
            <li class="list-items"><a>Aadhi</a></li>
            <li class="list-items"><a>Azeem</a></li>
            <li class="list-items"><a>Daisy</a></li>
            <li class="list-items"><a>Fatima</a></li>
            <li class="list-items"><a>Tejas</a></li>
            <li class="list-items"><a>Kayal</a></li>
            <li class="list-items"><a>Owen</a></li>
            <li class="list-items"><a>Paige</a></li>
            <li class="list-items"><a>Quincy</a></li>
            <li class="list-items"><a>Xavier</a></li>
            <li class="list-items"><A>Latha</a></li>`
            ;

let submitBtn = createElements('button','btn btn-secondary m-3');
submitBtn.setAttribute('type','button');
submitBtn.textContent = "Submit"

let resetBtn = createElements('button','btn btn-secondary m-3');
resetBtn.setAttribute('type','reset');
resetBtn.textContent = "Reset"

let nameDiv = createElements('div','row container');
let cardCol = createElements('div','col-sm-6');

let cardDes = createElements('p','row fs-2');
cardDes.textContent = "Name Related to Top 2 Countries And Their Probabilities Are-"

document.body.prepend(outerContainer);
outerContainer.append(row1,row2);
row1.append(header);
row2.append(formDiv, nameDiv);
formDiv.append(input,submitBtn,resetBtn,listDiv);
listDiv.append(list);

function createElements(tagName,className) {
    let t = document.createElement(tagName);
    t.setAttribute('class',className);
    return t;
}


async function getCards(nameInput) {
    let content = await getNameData(nameInput);
    let name = content.name;
    let country1 = content.country[0].country_id;
    let probability1 = content.country[0].probability;
    let country2 = content.country[1].country_id;
    let probability2 = content.country[1].probability;

    let card = createElements('div','card mt-3');
    card.setAttribute('style','width:50rem')

    let cardHeader = createElements('div','card-header bg-info');

    let heading = createElements('h4','text-center');
    heading.textContent = `${name.toUpperCase()}`

    let cardBody = createElements('div','card-body')
    cardBody.setAttribute('style','background-color: #ffe0db;')

    let row1 = createElements('div','row');
    let row2 = createElements('div','row');
    row2.setAttribute('style','background-color: #8fd7c7;')
    let row3 = createElements('div','row');
    row3.setAttribute('style','background-color: #8fd7c7;')

    let detail = createElements('p','para1');
    detail.textContent = "Name Related to Top 2 Countries And Their Probabilities Are-'"
    
    let para1 = createElements('p','fw-bold');
    para1.textContent = `Top 1st Country Name  :`
    let span1 = createElements('span','span1')
    span1.textContent = ` ${country1}`
    para1.append(span1)

    let para2 = createElements('p','fw-bold');
    para2.textContent = `Probability of ${country1} :`
    let span2 = createElements('span','span2')
    span2.textContent = ` ${probability1}`
    para2.append(span2)

    let para3 = createElements('p','fw-bold');
    para3.textContent = `Top 2nd Country Name  :`
    let span3 = createElements('span','span3')
    span3.textContent = ` ${country2}`
    para3.append(span3)

    let para4 = createElements('p','fw-bold');
    para4.textContent = `Probability of ${country2} :`
    let span4 = createElements('span','span2')
    span4.textContent = ` ${probability2}`
    para4.append(span4)

    nameDiv.append(card);
    card.append(cardHeader,cardBody)
    cardHeader.append(heading)
    cardBody.append(row1,row2,row3)
    row1.append(detail)
    row2.append(para1,para2)
    row3.append(para3,para4)
    // cardBody.append(top1,top2)
    
}

function handleSubmit(event) {
    event.preventDefault();

    let nameInput = input.value;
    getCards(nameInput)
}

function reset(event){
    location.reload();
};

form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);
resetBtn.addEventListener('click',reset)