window.alert = function() { throw("An alert called") }
const url = "https://internapp.vercel.app/bhakti/todos/";
var pending = []
var completed = []

class Todo{
    constructor(url){   
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
            god.Pending()
            god.Completed()
        })

    }
    goto(url){
    
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
            god.Pending()
            god.Completed()
        })
    }

    //onclick checkbox data transfer from pend to com
check(id){
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
                god.goto(url)
            }
            
        }) 
    }
    
}  

//again for transfering data from com to pend onclick checkedbox 
 abc(id){
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
        god.goto(url)
    }
    })
   
}

//for delete using DELETE request method 
 xyz(id){
    $.ajax({
        url: url+id,
        type: "DELETE",
        success : function(){
            god.goto(url)
        }
    })
}

Pending(){
    var container = ""
    pending.forEach(value => {
        container += `<div class='${value.id} food'>`;
        container += `<div class="oh">`;
        container +=`<input type="checkbox" style="cursor:pointer;" onclick="check('${value.id}')"  id='${value.id}' class="good">`;
        container += `<ul style="list-style:none;">`;
        container += `<li style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:larger; padding-top:10px; ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:small; padding-bottom:10px;  " >` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
        container += `<div class="ohk">`;
        container +=`<i class="fa fa-trash" type="submit"  style="cursor:pointer;" id="a" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += `</div>`;
        container += `</div>`;
    });
    $("#pend h4").append(container)
}


Completed() {
    var container = ""
    completed.forEach(value => {
        container += `<div class='${value.id} food' >`;
        container += `<div class="oh">`;
        container +=`<input type="checkbox" style="cursor:pointer;"  onclick="abc('${value.id}')"   id='${value.id}'  checked>`;
        container += `<ul style="list-style:none;">`;
        container += `<li style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:larger; padding-top:10px ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:small; padding-bottom:10px;  padding:top;" >` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
        container += `<div class="ohk">`;
        container +=`<i class="fa fa-trash" type="submit"  style="cursor:pointer;" id="a" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
        container += `</div>`;
        container += `</div>`;
    });
    $("#com h4").append(container)
}

post(url){
    god.goto(url)      
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
                god.goto(url)
                god.Pending()
                god.Completed()
            }
        })
}
}
var god = new Todo(url)

$("#add").click(function(e){
    e.preventDefault()
    var data = {
        id : '',
        title: $("#title").val(),
        description: $("#desc").val(),
        Completed: false,
        
    }
    if(data.title==="" && data.description==="")
    {
        lblError.innerHTML="Title required *"
        lblError12.innerHTML="Description required *"
    }
    else if(data.title===""){
        lblError.innerHTML="Title required *"
        lblError12.innerHTML="" 
    }
    else if(data.description===""){
        lblError.innerHTML=""
        lblError12.innerHTML="Description required *"
    } 
    else{
        god.post(url)
        $("#lblError").text("")
        $("#lblError12").text("")
    }
})
function xyz(id){
    god.xyz(id)
}
function abc(id){
    god.abc(id)
}
function check(id){
    god.check(id)
}                   