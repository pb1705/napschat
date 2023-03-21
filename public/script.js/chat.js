const socket = io();
let group = false;
document.querySelector('#randomchat').addEventListener('click', () => {
    socket.emit('joinrandomchat');
    group = true;
    document.querySelector("#history").classList.add("chat");
    document.getElementById("history").innerHTML = "";
    document.querySelector('#namechat').innerHTML = '<b>Random Chat</b>';
    document.querySelector("#inputmsg").innerHTML = '<div class="msginputuser input-group"><input type="text" name = "msg" placeholder="Enter Your message here" class="form-control msgbyuser" ><button class="sendbtn"  type="submit"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png"/></button></div>'
    document.querySelector('.sendbtn').addEventListener('click', () => {
        console.log("eventfired");
        let data = document.querySelector(".msgbyuser").value;
        let div = document.createElement('div');
        let msgbyyouelement = document.createElement('p');
        div.classList.add("right");
        msgbyyouelement.classList.add('msgpara');
        msgbyyouelement.innerText = data;
        div.appendChild(msgbyyouelement);
        document.getElementById("history").appendChild(div);
        socket.emit('sendmsg', { msg: data, username: document.getElementById('changeusername').innerText });
        document.querySelector(".msgbyuser").value = "";
    });
    document.querySelector('.msgbyuser').addEventListener('keydown', (evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            document.querySelector('.sendbtn').click();
        }
    })
});

socket.on('recievemsg', (data) => {
    var audio = new Audio("/iph.mp3");
    audio.play();
    let div = document.createElement('div');
    if (group) {
        let p = document.createElement('p');
        p.style.marginBottom = '4px';
        if(window.screen.width<=750){
            p.style.height="90%";
        }
        p.innerText = data.username;
        div.appendChild(p);
        p.style.color = "#19A7CE";
    }
    let msgbyyouelement = document.createElement('p');
    div.classList.add("left");
    msgbyyouelement.style.marginBottom = '0px';
    msgbyyouelement.innerText = data.msg;
    div.appendChild(msgbyyouelement);
    
    document.getElementById("history").appendChild(div);
});
var grouptosendin = "";
document.querySelector('#creategroup').addEventListener('click', (event) => {
    group = true;
    event.preventDefault()
    grouptosendin = document.getElementById('groupnametocreate').value + document.getElementById('groupadminusertocreate').value;
    let groupname = document.getElementById('groupnametocreate').value;
    if (localStorage.getItem('groups') == null) {
        let groups = {}
        groups[grouptosendin] = groupname;
        
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    else {
        let groups = JSON.parse(localStorage.getItem('groups'));
        groups[grouptosendin] = groupname;
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    let cont =document.querySelector("#prevchats");
    if (window.screen.width < 1000) {
        cont = document.querySelector('#modalprevchats');
    }
    if(alreadyinhistroy[grouptosendin]==null){
        
        alreadyinhistroy[grouptosendin]=true;
        
        cont.prepend(returnelementtoadd(groupname,grouptosendin));
    }
    else{
        if(cont.firstElementChild.innerText!=groupname){
            let elementneighbour = cont.firstElementChild;
            while(elementneighbour.innerText!=groupname){
                elementneighbour = elementneighbour.nextElementSibling;
            }
            elementneighbour.remove();
        
        cont.prepend(returnelementtoadd(groupname,grouptosendin));
        }
    }
    socket.emit('joingroup', document.getElementById('groupnametocreate').value + document.getElementById('groupadminusertocreate').value);
    document.getElementById("history").innerHTML = "";
    document.querySelector('#namechat').innerHTML = '<b>' + document.getElementById('groupnametocreate').value + '</b>';
    document.querySelector("#history").classList.add("chat");
    document.querySelector("#inputmsg").innerHTML = '<div class="msginputuser input-group"><input type="text" name = "msg" placeholder="Enter Your message here" class="form-control msgbyuser" ><button class="sendbtn"  type="submit"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png"/></button></div>'
    document.querySelector('.sendbtn').addEventListener('click', () => {
        let data = document.querySelector(".msgbyuser").value;
        let div = document.createElement('div');
        let msgbyyouelement = document.createElement('p');
        div.classList.add("right");
        msgbyyouelement.classList.add('msgpara');
        msgbyyouelement.innerText = data;
        div.appendChild(msgbyyouelement);
        document.getElementById("history").appendChild(div);
        socket.emit('sendmsgingroup', { msg: data, groupname: grouptosendin, username: document.getElementById('changeusername').innerText });
        document.querySelector(".msgbyuser").value = "";
    });
    document.querySelector('.msgbyuser').addEventListener('keydown', (evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            document.querySelector('.sendbtn').click();
        }
    })
})
document.querySelector('#joingroup').addEventListener('click', (event) => {
    event.preventDefault()
    group = true;

    grouptosendin = document.getElementById('nameofthegroptojoin').value + document.getElementById('adminemailjoin').value;
    let groupname = document.getElementById('nameofthegroptojoin').value;
    if (localStorage.getItem('groups') == null) {
        let groups = {}
        groups[grouptosendin] = groupname;
        
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    else {
        let groups = JSON.parse(localStorage.getItem('groups'));
        groups[grouptosendin] = groupname;
        localStorage.setItem('groups', JSON.stringify(groups));
    }
    let cont =document.querySelector("#prevchats");
    if (window.screen.width < 1000) {
        cont = document.querySelector('#modalprevchats');
    }
    if(alreadyinhistroy[grouptosendin]==null){
        
        alreadyinhistroy[grouptosendin]=true;
        
        cont.prepend(returnelementtoadd(groupname,grouptosendin));
    }
    else{
        if(cont.firstElementChild.innerText!=groupname){
            let elementneighbour = cont.firstElementChild;
            while(elementneighbour.innerText!=groupname){
                elementneighbour = elementneighbour.nextElementSibling;
            }
            elementneighbour.remove();
        
        cont.prepend(returnelementtoadd(groupname,grouptosendin));
        }
    }
    socket.emit('joingroup', document.getElementById('nameofthegroptojoin').value + document.getElementById('adminemailjoin').value);
    document.getElementById("history").innerHTML = "";
    document.querySelector('#namechat').innerHTML = '<b>' + document.getElementById('nameofthegroptojoin').value + '</b>';
    document.querySelector("#history").classList.add("chat");
    document.querySelector("#inputmsg").innerHTML = '<div class="msginputuser input-group"><input type="text" name = "msg" placeholder="Enter Your message here" class="form-control msgbyuser" ><button class="sendbtn"  type="submit"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png"/></button></div>'
    document.querySelector('.sendbtn').addEventListener('click', () => {
        let data = document.querySelector(".msgbyuser").value;
        let div = document.createElement('div');
        let msgbyyouelement = document.createElement('p');
        div.classList.add("right");
        msgbyyouelement.classList.add('msgpara');
        msgbyyouelement.innerText = data;
        div.appendChild(msgbyyouelement);
        document.getElementById("history").appendChild(div);
        socket.emit('sendmsgingroup', { msg: data, groupname: grouptosendin, username: document.getElementById('changeusername').innerText });

        document.querySelector(".msgbyuser").value = "";
    });
    document.querySelector('.msgbyuser').addEventListener('keydown', (evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            document.querySelector('.sendbtn').click();
        }
    })
});
document.querySelector('#personalcahtbtn').addEventListener('click', (event) => {
    event.preventDefault()
    group = false;
    temp = [];
    temp.push(document.getElementById('mymailid').innerText)
    temp.push(document.getElementById('oppositterperson').value)
    temp.sort();
    grouptosendin = temp[0] + temp[1];
    socket.emit('joingroup', grouptosendin);
    document.getElementById("history").innerHTML = "";
    document.querySelector('#namechat').innerHTML = '<b>' + document.getElementById('oppisitterpersonname').value + '</b>';
    document.querySelector("#history").classList.add("chat");
    document.querySelector("#inputmsg").innerHTML = '<div class="msginputuser input-group"><input type="text" name = "msg" placeholder="Enter Your message here" class="form-control msgbyuser" ><button class="sendbtn"  type="submit"><img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-send-ecommerce-user-interface-inkubators-glyph-inkubators.png"/></button></div>'
    document.querySelector('.sendbtn').addEventListener('click', () => {
        let data = document.querySelector(".msgbyuser").value;
        let div = document.createElement('div');
        let msgbyyouelement = document.createElement('p');
        div.classList.add("right");
        msgbyyouelement.classList.add('msgpara');
        msgbyyouelement.innerText = data;
        div.appendChild(msgbyyouelement);
        document.getElementById("history").appendChild(div);
        socket.emit('sendmsgingroup', { msg: data, groupname: grouptosendin });

        document.querySelector(".msgbyuser").value = "";
    });
    document.querySelector('.msgbyuser').addEventListener('keydown', (evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            document.querySelector('.sendbtn').click();
        }
    })
});

if (window.screen.width < 1000) {

    document.querySelector('.row').removeChild(document.querySelector('.row').firstElementChild);

    let liitem = document.createElement('li');
    liitem.classList.add('nav-item');
    let button = document.createElement('button');
    button.innerText = "New Chat";
    button.classList.add('btn-nav-pushed')
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#ModalToggle');
    liitem.appendChild(button);
    button.addEventListener('click',()=>{
        document.querySelector(".navbar-toggler").click();
    })
    document.querySelector('.addbutton').appendChild(liitem);
    let liitem2 = document.createElement('li');
    liitem2.classList.add('nav-item');
    let button2 = document.createElement('button');
    button2.innerText = "Chats";
    button2.classList.add('btn-nav-pushed')
    button2.setAttribute('data-bs-toggle', 'modal');
    button2.setAttribute('data-bs-target', '#ModalToggle5');
    liitem2.appendChild(button2);
    
    button2.addEventListener('click',()=>{
        document.getElementsByClassName("navbar-toggler").click();
    })
    document.querySelector('.addbutton').appendChild(liitem2);


}
function returnelementtoadd(groupname, groupid) {
    let div = document.createElement('div');
    let h6 = document.createElement('h6');
    h6.innerText = groupname;
    div.appendChild(h6);
    div.addEventListener('click', () => {
        document.getElementById('groupnametocreate').value = groupname;
        document.getElementById('groupadminusertocreate').value = groupid.substring(groupname.length);
        document.querySelector('#creategroup').click();
        if(window.screen.width<1000){
            document.querySelector('#modal5close').click();
        }
    })
    div.appendChild(document.createElement('hr'));
    return div;
}
let alreadyinhistroy = {}

let presentgroups = JSON.parse(localStorage.getItem('groups'));
for (i in presentgroups) {
    
    let cont = document.querySelector('#prevchats');
    if (window.screen.width < 1000) {
        cont = document.querySelector('#modalprevchats');
    }
    cont.append(returnelementtoadd(presentgroups[i],i));
    
    alreadyinhistroy[i] = true;
}



