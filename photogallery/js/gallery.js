"use strict"

class PhotoList {
    constructor(container = '.photo-gallery') {
        this.container = container;
        this.photos = [];
        this.allPhoto = [];
        this.comments = [];
        this.likes = [];

        this.getPhotos()
            .then((data) => {
                this.photos = data;
                this.render();
                document.getElementById("photo__id")
                    .addEventListener('click', event => {
                        if (event.target.className === 'photo__image') {
                            this.renderModalPhoto()
                        }
                    })
            });
    }


    getPhotos() {
        return fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    renderModalPhoto() {

        let photoFind = this.photos.find(item => item.id === Number(event.target.id))
        const modal = document.querySelector(".modal__container");
        modal.innerHTML = ''
        modal.insertAdjacentHTML('afterbegin', `
                           <div class="wrap">
                            <div class="modal" id="modal__id">
                            <div class="modal__item">
                                <div>
                                    <img src="${photoFind.url}" alt="some photo">
                                </div>
                                <div class="modal__form">
                                    <form >
                                        <input class="modal__input" type="text">
                                        <div class="modal__elements">
                                        <div type="reset" class="modal__button">
                                            Добавить комментарий                                                                           
                                        </div>
                                        <div class="likes-it">
                                        <i class="fas fa-heart"></i></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal__comments"></div>
                                
                            </div>
                            </div>
                           </div>
                                    `)
        document.body.style.overflowY = "hidden";
        document.getElementById("modal__id")
            .addEventListener('click', event => {
                if (event.target.className === 'modal') {
                    document.querySelector('.wrap').classList.toggle('invisible')
                    document.body.style.overflowY = "visible";
                }
            })
        document.getElementById("modal__id")
            .addEventListener('click', event => {
                if (event.target.className === 'modal__button') {
                    let comment = document.querySelector('.modal__input').value
                    if (comment === '') {
                        return false
                    } else {
                        this.addComment(comment, photoFind)

                    }

                }
            })

        document.getElementById("modal__id")
            .addEventListener('click', event => {
                if (event.target.className === 'fas fa-heart') {
                    this.likeWatch(photoFind)
                }
            })
        let likeFind = this.likes.find(item => item.id === Number(photoFind.id))
        if (likeFind) {
            document.querySelector('.fa-heart').style.cssText = 'color:red'
        } else {
            document.querySelector('.fa-heart').style.cssText = 'color:black'
        }
        this.renderCommentBlock(photoFind)


    }

    addComment(comment, photoFind) {
        let commentItem = {id: photoFind.id, comment: [comment]}
        let findComment = this.comments.find(item => item.id === Number(photoFind.id))
        if (findComment) {
            findComment['comment'].push(commentItem['comment'][0])
        } else {
            this.comments.push(commentItem)
        }
        this.renderCommentBlock(photoFind)


    }

    renderCommentBlock(photoFind) {
        let allComment = this.comments.find(item => item.id === Number(photoFind.id))
        if (allComment) {
            let commentText = document.querySelector('.modal__comments')
            commentText.innerHTML = ''
            for (let comment of allComment['comment']) {
                commentText.insertAdjacentHTML("beforeend", `<div class="comment__item">${comment}</div>`)
            }
        }
    }

    likeWatch(photoFind) {
        let likeToken = {id: photoFind.id}
        let likeFind = this.likes.find(item => item.id === Number(photoFind.id))
        if (likeFind) {
            this.likes.splice(this.likes.indexOf(likeFind), 1)
            document.querySelector('.fa-heart').style.cssText = 'color:black'
        } else {
            this.likes.push(likeToken)
            document.querySelector('.fa-heart').style.cssText = 'color:red'
        }

    }

    render() {
        const block = document.querySelector(this.container);
        for (const photo of this.photos) {
            const photoObject = new PhotoItem(photo);
            this.allPhoto.push(photoObject);
            block.insertAdjacentHTML('afterbegin', photoObject.render());
        }


    }
}

class PhotoItem {
    constructor(photo) {
        this.id = photo.id
        this.img = photo.url;
    }

    render() {
        return `<div class="photo" data-id="${this.id}">
                      <img class="photo__image" id="${this.id}" src="${this.img}" alt="Some img">
                  </div>`;
    }
}

const pl = new PhotoList();

