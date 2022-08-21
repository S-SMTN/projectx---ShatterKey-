/* modal window */

$(document).ready(function(){
    $('.cardinfo').click(function(){
        let cardrid = $(this).data('id');
        let description = $(this).data('description');
        let keys = $(this).data('keys');
        let url = $(this).data('url');
        let preview = $(this).data('preview');
        let head = `<h4 class="modal-title"><div align="center">Photo's description</div></h5>`
        $.ajax({
            url: '/card_modal',
            type: 'post',
            data: {cardrid: cardrid, description: description, keys: keys, url: url, preview: preview},
            success: function(data){
                $('.modal-header').html(head);
                $('.modal-body').html(data);
                $('.modal-body').append(data.htmlresponse);
                $('#empModal').modal('show');
            }
        });
    });
});

/* check/uncheck all checkboxes on keys-list */

function checkedAll (keywordsForm) {
	let form_keys = document.getElementById('keywordsForm');
	for (let i = 0; i < form_keys.elements.length; i++){
        form_keys.elements[i].checked = true;
	}
    countcheck()
}
function uncheckedAll (keywordsForm) {
	let form_keys = document.getElementById('keywordsForm');
	for (let i = 0; i < form_keys.elements.length; i++){
        form_keys.elements[i].checked = false;
	}
    countcheck()
}

/* counting total keywords */
totalcount()
function totalcount(){
    let form_keys = document.getElementById('keywordsForm');
    document.getElementById('totalKwrds').innerHTML = form_keys.elements.length;
}


/* counting checked keywords */
countcheck()
function countcheck(){
    let form_keys = document.getElementById('keywordsForm');
    let checkedKeys = 0
    for (let i = 0; i < form_keys.elements.length; i++){
        if (form_keys.elements[i].checked) {
            checkedKeys++;
        }
    }
    document.getElementById('checkedKwrds').innerHTML = checkedKeys;
}

/* adding checked keywords to clipboard */
function addToClipboard(){
    let form_keys = document.getElementById('keywordsForm');
    let keywords = new Array();
    for (let i = 0; i < form_keys.elements.length; i++){
        if (form_keys.elements[i].checked) {
            /* console.log(form_keys.elements[i].id); */
            keywords.push(form_keys.elements[i].id);
        }
    }
    let head = `<h4 class="modal-title"><div align="center">Copied words (${keywords.length}):</div></h5>`
    keywords = keywords.join(', ')
    let copyhelper = document.createElement("input");
    copyhelper.className = 'copyhelper'
    document.body.appendChild(copyhelper);
    copyhelper.value = keywords;
    copyhelper.select();
    document.execCommand("copy");
    $.ajax({
        url: '/modal_clipboard',
        type: 'post',
        data: {keywords: keywords},
        success: function(data){
            $('.modal-header').html(head);
            $('.modal-body').html(data);
            $('.modal-body').append(data.htmlresponse);
            $('#empModal').modal('show');
        }
    });
    copyhelper.remove()
}

/* dynamic style of card's button (include/exclude) ...*/

function button_card(cardId){
    cardId = `b_`+cardId;
    buttonCard = document.getElementById(cardId)
    classesButton = buttonCard.classList;
    if (classesButton.contains('btn-card-excluded')) {
        classesButton.toggle('btn-card-excluded');
        classesButton.toggle('btn-card-included');
        buttonCard.innerHTML = 'Exclude';
    }
    else if (classesButton.contains('btn-card-included')){
        buttonCard.classList.remove('btn-card-included');
        buttonCard.classList.add('btn-card-excluded');
        buttonCard.innerHTML = 'Include';
    };
    dynamic_list()
    countcheck()
}


/* dynamic range of keywords list */
function dynamic_list() {
    let form_cards = document.getElementById('cardForm').elements;
    let keysList = '';
    let keywordsArray = []
    for (let i = 0; i < form_cards.length; i++) {
        if (form_cards[i].classList.contains('btn-card-included')) {
            keysList += (form_cards[i].getAttribute('data-keys') + ', ');
        }
    }
    keywordsArray.push(keysList.replaceAll('[', '').replaceAll(']', '').replaceAll("\'", "").split(', '));
    keywordsArray[0].pop();
    let KeysDictArray = []
    for (let key = 0; key < keywordsArray[0].length; key++) {
        let KeysDict = {};
        let match = false;
        for (let dict of KeysDictArray) {
            if (dict.key === keywordsArray[0][key]) {
                dict.count++;
                match = true;
                break;
            }
        }
        if (match === true){
            continue;
        }
        else {
            KeysDict.key = keywordsArray[0][key];
            KeysDict.count = 1;
            KeysDictArray.push(KeysDict);
        }
    }
    /* sorted array of keys and count matching */
    KeysDictArray.sort((a, b) => a.count < b.count ? 1 : -1);

    add_keys_list(KeysDictArray);
}

/* Dynamic list of keywords */

function add_keys_list(KeysDictArray){
    let motherDiv = document.getElementById('motherDiv');

    let previousMotherList = document.getElementById('keywordsForm');
    previousMotherList.remove()

    let motherForm = document.createElement('form');
    motherForm.setAttribute('id', 'keywordsForm');
    motherDiv.appendChild(motherForm);

    for (let key of KeysDictArray) {

        let ul = document.createElement('ul');
        ul.setAttribute('class', 'list-group list-group-horizontal');
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item keys-list-key');
        let div = document.createElement('div');
        div.setAttribute('class', 'form-check form-switch');
        li.appendChild(div);
        ul.appendChild(li);

        let checkbox = document.createElement('input');
        checkbox.setAttribute('class', 'form-check-input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', key.key);
        checkbox.setAttribute('onchange', 'countcheck()');

        let checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('class', 'form-check-label');
        checkboxLabel.setAttribute('for', key.key);
        checkboxLabel.innerHTML = key.key;

        div.appendChild(checkbox);
        div.appendChild(checkboxLabel);

        let count = document.createElement('li');
        count.setAttribute('class', 'list-group-item keys-list-count');
        count.innerHTML = key.count;
        ul.appendChild(count);

        motherForm.appendChild(ul);
    }
    totalcount();
    countcheck();
}

dynamic_list()

/* check/uncheck all checkboxes on PhotoCards-list */

function checkAllCards() {
	let formCards = document.getElementById('photoCards').childNodes;
    for (let i = 1; i < formCards.length; i += 2){
        let button = formCards[i].childNodes[3].childNodes[0];
        button.setAttribute('class', 'btn btn-secondary btn-sm btn-card-included');
        button.innerHTML = 'Included';
    }
    dynamic_list();
}

function UnCheckAllCards() {
	let formCards = document.getElementById('photoCards').childNodes;
    for (let i = 1; i < formCards.length; i += 2){
        let button = formCards[i].childNodes[3].childNodes[0];
        button.setAttribute('class', 'btn btn-secondary btn-sm btn-card-excluded');
        button.innerHTML = 'Exluded';
    }
    dynamic_list();
}

document.innerHTML