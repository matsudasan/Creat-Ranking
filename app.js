const select = document.getElementById('select')
const ranking = document.getElementById('ranking')
const openButton=document.getElementById('open')
const closeButton=document.getElementById('close')
const modal=document.getElementById('modal')
const explanation=document.getElementById('explanation')
var num = 1

select.onchange = () => {
    ranking.innerHTML = ''
    for (let i = 1; i <= select.value; i++) {
        const content = document.createElement('li')
        const number = document.createElement('p')
        const images = document.createElement('div')
        images.addEventListener('drop', () => Drop(images,event))
        images.addEventListener('dragover', () => DragOver(images,event))
        images.addEventListener('dragleave', () => DragLeave(images))
        images.className = 'images'
        number.textContent = `${i}位`
        content.appendChild(number)
        ranking.appendChild(content)
        content.appendChild(images)
    }
}
for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option')
    option.text = `${i}位まで`
    option.value = i
    select.appendChild(option)
}

const DragOver = (images,e) => {
    e.preventDefault()
    images.classList.add("color")
}
const DragLeave = images => {
    images.classList.remove('color')
}
const DragStart = e => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.id);
}
const Drop =  (images,e) => {
    e.preventDefault()
    images.classList.remove('color')
    if (e.dataTransfer.effectAllowed === 'move') {
        const id= e.dataTransfer.getData('text')
        const element=document.getElementById(id)
        images.appendChild(element)
    } else {
        const reader = new FileReader()
        reader.onload = (e) => {
            num += 1
            const image = document.createElement('img')
            image.id = "image" + num
            image.src = e.target.result
            image.height = 100
            image.addEventListener('dragstart', () => DragStart(event))
            image.addEventListener('click',()=>Delete(image))
            images.appendChild(image)
        }
        reader.readAsDataURL(e.dataTransfer.files[0])
    }
}

const Delete=(img)=>{
    if(confirm('この画像を削除しますか')){
        img.remove()
    }
}

openButton.onclick=()=>{
    modal.style.display='block'
}
closeButton.onclick=()=>{
    modal.style.display='none'
}

modal.onclick=()=>{
    modal.style.display='none'
}
explanation.onclick=(e)=>{
    e.stopPropagation()
}