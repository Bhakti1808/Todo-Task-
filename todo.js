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
        container += `<ul>`;
        container += `<li style="font-style: oblique; font-size:larger; color:brown; ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:medium; padding-bottom:10px; " >` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
        container += `<div class="ohk">`;
        container +=`<i class="fa fa-trash" style="cursor:pointer;" type="submit" onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
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
        container += `<ul>`;
        container += `<li style="font-style: oblique; font-size:larger; color:brown; ">` + value.title + `</li>`;
        container += `<li style="font-style: normal; font-size:medium; padding-bottom:10px;">` + value.description + `</li>`;
        container += `</ul>`;
        container += `</div>`;
        container += `<div class="ohk">`;
        container +=`<i class="fa fa-trash" style="cursor:pointer;" type="submit"  onclick="xyz('${value.id}')"  id='${value.id}'></i>`;
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
    god.post(url)
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