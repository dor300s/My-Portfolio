'use strict';

function onInit() {
    renderProjects();
}

function renderProjects() {
    var projects = getProjects();
    var strHTML = projects.map(project => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href=#portfolioModal1 onclick="renderModal(${project.id})">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="projects-img/img${project.id}.PNG" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${project.name}</h4>
            <p class="text-muted">${project.lables}</p>
          </div>
        </div>`
    }).join('');
    $('.gallery-container').html(strHTML);
}

function renderModal(id) {
    var projects = getProjects();
    var idx = projects.findIndex(project => project.id === id);
    $('.modal-project-name').text(projects[idx].name);
    $('.modal-project-intro').text(projects[idx].lables);
    $('.modal-project-img').attr('src', `projects-img/img${projects[idx].id}.PNG`);
    $('.modal-project-description').text(projects[idx].desc);
    $('.modal-project-publish').text(projects[idx].publishedAt);
    $('.modal-project-navigate').attr('href',projects[idx].url);
}

function onSendMail(){
    var email = document.querySelector('#exampleFormControlInput1');
    var subject = document.querySelector('.subject-input');
    var message = document.querySelector('.message-input');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email.value}&su=${subject.value}&body=${message.value}`)
}