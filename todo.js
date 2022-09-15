function randomID() {
    return Math.floor(Math.random() * 1000)
}
const url = "https://internapp.vercel.app/bhakti/todos/";

//onclick checkbox data transfer from pend to com
function check(id){
    $("."+id).remove()
    var container = " ";
    $.get("https://internapp.vercel.app/bhakti/todos/",function(data){
       $.each(data, function(key,value){
        if(id==value.id){
        container += `<div class='${value.id}' >`;
        container += "<ul>"
        container +=`<input type="checkbox"  onclick="abc('${value.id}')"  id='${value.id}' class="ok">`;
        container +=`<i class="fa fa-edit" type="submit"  onclick="edit('${value.id}')"  id='${value.id}'></i>`;
        container +=`<i class="fa fa-trash" type="submit" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += "<li>" + value.title + "</li>";
        container += "<li>" + value.description + "</li>";
        container += "</ul>";
        container += `</div>`; 
        }
       })
       $("#com h4").append(container)
       $(".ok").prop('checked', true);
    })
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

//again for transfering data from com to pend onclick checkedbox 
function abc(id){
    $("."+id).remove()
    var container = " ";
    $.get("https://internapp.vercel.app/bhakti/todos/",function(data){
       $.each(data, function(key,value){
        if(id==value.id){
        container += `<div class='${value.id}'>`;
        container += "<ul>"
        container +=`<input type="checkbox"  onclick="check('${value.id}')"  id='${value.id}' class="ok">`;
        container +=`<i class="fa fa-edit" type="submit"  onclick="edit('${value.id}')"  id='${value.id}'></i>`;
        container +=`<i class="fa fa-trash" type="submit" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += "<li>" + value.title + "</li>";
        container += "<li>" + value.description + "</li>";
        container += "</ul>";
        container += `</div>`;
        }
       })
       $("#pend h4").append(container)
    })
}
//for edit and save button working by using GET and PUT request method
function edit(id){
    $.get(url, function (data) {
        $.each(data, function (key, value) {
            if(id == value.id) {
                $("#title").val(value.title)
                $("#desc").val(value.description)
            }
        })
    })
    $("#save").click(function(){
        var data = {
            title: $("#title").val(),
            description: $("#desc").val(),
        }
        $.ajax({
            url: url + id,
            type: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success:function(){
                location.reload()
            }
        })
    })
}

//for delete using DELETE request method
function xyz(id){
    $.ajax({
        url: url+id,
        type: "DELETE",
        success : function(){
            // location.reload()
            $("#pend h4").empty();
            goto()
        }
    })
}

// $(document).ready(function(){
//     var container = " ";
//     $.get("https://internapp.vercel.app/bhakti/todos/",function(data){
//         $.each(data, function(key,value){
//         container += `<div class='${value.id}'>`;
//         container += "<ul>"
//         container +=`<input type="checkbox"  onclick="check('${value.id}')"  id='${value.id}' >`;
//         container +=`<i class="fa fa-edit" type="submit"  onclick="edit('${value.id}')"  id='${value.id}'></i>`;
//         container +=`<i class="fa fa-trash" type="submit" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
//         container += "<li>" + value.title + "</li> ";
//         container += "<li>" + value.description + "</li>";
//         container += "</ul>";
//         container += `</div>`;
//        })
//        $("#pend").append(container)
//     })
//     $("#add").click(function()
//     {
//         var data = {
//             id : '',
//             title: $("#title").val(),
//             description: $("#desc").val(),
//         }
//         $.ajax({
//             url: "https://internapp.vercel.app/bhakti/todos/",
//             type: "POST",
//             data: JSON.stringify(data),
//             contentType: 'application/json'
//         })
//     })
// })
function goto(){
    var container = " ";
    $.get("https://internapp.vercel.app/bhakti/todos/",function(data){
        $.each(data, function(key,value){
        container += `<div class='${value.id}' >`;
        container += "<ul>";
        container +=`<input type="checkbox"  onclick="check('${value.id}')"  id='${value.id}' >`;
        container +=`<i class="fa fa-edit" type="submit"  onclick="edit('${value.id}')"  id='${value.id}'></i>`;
        container +=`<i class="fa fa-trash" type="submit" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += "<li>" + value.title + "</li> ";
        container += "<li>" + value.description + "</li>";
        container += "</ul>";
        container += `</div>`;
       })
       $("#pend h4").append(container)
    })
}
$(document).ready(function(){
    goto()      
    $("#add").click(function()
    {
        var data = {
            id : '',
            title: $("#title").val(),
            description: $("#desc").val()
        }
        $.ajax({
            url: "https://internapp.vercel.app/bhakti/todos/",
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(){
            location.reload()
            // $("#pend h4").empty();
            // goto()
            }
        })
    }) 
})