function randomID() {
    return Math.floor(Math.random() * 1000)
}
const url = "https://internapp.vercel.app/bhakti/todos/";

var pending = []
var completed = []

//onclick checkbox data transfer from pend to com
function check(id){
    if ($("input.good").is(":checked")) {
        
        var data = {
            completed: [],
            Completed: true
        }
        $.ajax({
            url: url + id,
            type: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success:function(){
                $.each(data, function(key,value){
                    $("."+id).remove()  
                    if (value.Completed) {
                        completed.push(value);
                    }
                })
                goto()
            }
            
        }) 
    }
    
}  

//again for transfering data from com to pend onclick checkedbox 
function abc(id){
    $("."+id).remove()
   var data ={
    pending: [],
    Completed: false
   }
   $.ajax({
    url: url + id,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: 'application/json',
    success:function(){
        $.each(data, function(key,value){
            if (value.Completed) {
                pending.push(value);
            }
        })
        goto()
        
    }
    })
   
}

//for edit and save button working by using GET and PUT request method
function edit(id){
    $("#add").hide()
    $("#save").show()
    $.get(url, function (data) {
        $.each(data, function (key, value) {
            if(id == value.id) {
                $("#title").val(value.title)
                $("#desc").val(value.description)
            }
        })
    })
    $("#save").click(function(){
      $("#save").hide()
      $("#add").show()

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
                $("#title").val('');
                $("#desc").val('');
                goto()
                Pending()
                Completed()
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
            // $("#pend h4").empty();
            goto()
            Pending()
            Completed()

        }
    })
}

function Pending(){
    var container = ""
    pending.forEach(value => {
        container += `<div class='${value.id}' >`;
        container += `<ul>`;
        container +=`<input type="checkbox" onclick="check('${value.id}')"  id='${value.id}' class="good">`;
        container +=`<i class="fa fa-edit" type="submit" style=" padding-left:800px; "  onclick="edit('${value.id}')"  id='${value.id}'></i>`;
        container +=`<i class="fa fa-trash" type="submit" style=" padding: 5px;" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += `<li style="font-style: oblique; font-size:large; ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:medium;" >` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
    });
    $("#pend h4").append(container)
}

function Completed() {
    var container = ""
    completed.forEach(value => {
        container += `<div class='${value.id}' >`;
        container += `<ul>`;
        container +=`<input type="checkbox"  onclick="abc('${value.id}')"  id='${value.id}' class="ok" checked>`;
        container +=`<i class="fa fa-edit" type="submit" style=" padding-left:800px; "   onclick="edit('${value.id}')"  id='${value.id}'></i>`;
        container +=`<i class="fa fa-trash" type="submit" style=" padding: 5px;" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += `<li style="font-style: oblique; font-size:large; ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:medium;">` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
    });
    $("#com h4").append(container)
}

// GET request  method
function goto(){
    
    $.get(url, function(data){

        $("#pend h4").empty();
        $("#com h4").empty();

        pending = [];
        completed=[];
        $.each(data, function(key,value){
            if (value.Completed) {
                completed.push(value)
            }
            else{
                pending.push(value)
            }
        })
        Pending()
        Completed()
    })
    
}

// POST request  method
$(document).ready(function(){
    goto()      
    $("#add").click(function()
    {
        var data = {
            id : '',
            title: $("#title").val(),
            description: $("#desc").val(),
            Completed: false,
            
        }
        $.ajax({
            url: "https://internapp.vercel.app/bhakti/todos/",
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(){
                $("#title").val('');
                $("#desc").val('');
                $("#pend h4").empty();
                goto()
                Pending()
                Completed()
            }
        })
    }) 
})