const addToLocalStroage = (paramiter, value) => {
    localStorage.setItem(paramiter, JSON.stringify(value))
}
const getFromLocalStroage = (paramiter) => {
    let workers = JSON.parse(localStorage.getItem(paramiter))
    return workers
}