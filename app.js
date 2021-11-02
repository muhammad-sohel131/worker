const detailsBody = document.getElementById('details-body')
const submitButton = document.getElementById('submitButton')
const summaryBody = document.getElementById('summary-body')
const detailsHead = document.getElementById('detailsHead')
const regularForm = document.getElementById('regularForm')
const openAddWorkerForm = document.querySelector('.open-add-worker-form')
const addWorker = document.querySelector('.add-worker')

document.querySelector('.colse-add-modal').addEventListener('click', (e) => {
    e.preventDefault()
    addWorker.classList.toggle('active-modal')
})

openAddWorkerForm.addEventListener('click', (e) => {
    e.preventDefault()
    addWorker.classList.toggle('active-modal')
})

let workers = getFromLocalStroage('workers') || []


const makeRegularityForm = () => {
    let inputDiv = `
        <div class='form-head'>
            <h4>Name</h4>
            <h4>Present</h4>
            <h4>Taken</h4>
        </div>
    `
    workersInformation.forEach(workerInfo => {
        inputDiv += `
        <div class="form-filed">
            <label for=${workerInfo.fullName}>${workerInfo.fullName}</label>
            <input type="checkbox" name=${workerInfo.fullName}come id=${workerInfo.fullName}come >
            <input type="text" name=${workerInfo.fullName}take  id=${workerInfo.fullName}take >
        </div>
        `
    })
    regularForm.innerHTML = inputDiv
}

const makeDetailsHead = () => {
    detailsHead.innerHTML = ''
    const tr = document.createElement('tr')
    let rows = '<th>Date</th>'
    workersInformation.forEach(worker => {
        rows += `
            <th>${worker.fullName}</th>
        `
    })
    tr.innerHTML = rows;
    detailsHead.appendChild(tr)
}

const displayDetailsBody = () => {
    detailsBody.innerHTML = ''
    workers.forEach((worker) => {
        const tr = document.createElement('tr')
        const keys = Object.keys(worker)
        let cols = `<th>${worker.currentDate}</th>`
        keys.forEach(key => {
            if(key !== 'currentDate'){
                cols += `
                    <td>${worker[key].come ? 'present' : 'absent'} / ${worker[key].take}</td>
                `
                tr.innerHTML = cols
            }
        })
        detailsBody.appendChild(tr)
    })
    
}
const displaySummaryBody = () => {
    let rows = ''
    workersInformation.forEach(user => {
        rows += `
        <tr>
            <th data-name=${user.fullName}>${user.fullName}</th>
            <td>${user.totalCome}</td>
            <td>${user.totalCome * 500}</td>
            <td>${user.totalTake}</td>
            <td>${(user.totalCome*500) - (user.totalTake)}</td>
        </tr>
    `
    })
    
    summaryBody.innerHTML = rows
}

const clearForm = () => {
    let inputs = document.querySelectorAll('input');
    [...inputs].forEach(input => {
        input.value = ''
        input.checked = false
    })
}

const showProfile = (worker) => {
    let user = workersInformation.filter(item => item.fullName === worker)
    console.log(user)
    document.querySelector('.name').innerText = user[0].fullName
    document.querySelector('.number').innerText = user[0].mobileNumber
    document.querySelector('.info').innerText = user[0].address

    document.querySelector('.modal-section').classList.toggle('active-modal')
}

summaryBody.addEventListener('click', (e) => {
    let worker = e.target.dataset.name;
    if(worker){
        showProfile(worker)
    }
})
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal-section').classList.toggle('active-modal')
})
       

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const date = new Date().getDate()
    const month = new Date().getMonth()+1

    let formFiled = regularForm.querySelectorAll('.form-filed');

    const regularityInfo = {};
    regularityInfo.currentDate = `${date}/${month}`;
    [...formFiled].forEach(field => {
        let inputs = field.querySelectorAll('input')
        let id = field.querySelector('label').getAttribute('for')
       
        let name = workersInformation.filter(obj => obj.fullName === id)
        let obj = {}
        inputs.forEach(input => {
            if(input.type === 'checkbox'){
                obj.come = input.checked
                name[0].totalCome = name[0].totalCome + input.checked
            }
            if(input.type === 'text'){
                obj.take = input.value
                name[0].totalTake = name[0].totalTake + (+input.value)
            }
        })
        regularityInfo[id] = obj
        addToLocalStroage('workersInformation',workersInformation)
    })
    workers = [...workers,regularityInfo]
    addToLocalStroage('workers', workers)
    
    clearForm()
    displayDetailsBody()
    displaySummaryBody()
})

makeDetailsHead()
makeRegularityForm()
displayDetailsBody()
displaySummaryBody()
