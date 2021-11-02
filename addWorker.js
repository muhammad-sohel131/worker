const addButton = document.getElementById('addButton')
const fullName = document.getElementById('fullName')
const mobileNumber = document.getElementById('mobileNumber')
const address = document.getElementById('address')
const error = document.querySelector('.error')
const profilePic = document.querySelector('#profilePic')

const workersInformation = getFromLocalStroage('workersInformation') || []

addButton.addEventListener('click', (e) => {
    e.preventDefault()
     if(fullName.value && mobileNumber.value){
        let existTheUser = workersInformation.filter(worker => worker.fullName === fullName.value)
        if(existTheUser.length > 0){
            error.innerText = 'The name is already exist!'
            setTimeout(() => {
                error.innerText = ''
            },2000)
        }else {
            let worker = {
                fullName : fullName.value,
                mobileNumber: mobileNumber.value,
                address: address.value,
                totalCome: 0,
                totalTake: 0
            }
            workersInformation.push(worker)
            addToLocalStroage('workersInformation', workersInformation)
            addWorker.classList.toggle('active-modal')
            makeDetailsHead()
            makeRegularityForm()
            displayDetailsBody()
            displaySummaryBody()
        }
     }else {
        error.innerText = 'Please put name and number'
        setTimeout(() => {
            error.innerText = ''
        },2000)
     }
})
