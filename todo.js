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
            Pending()
            Completed()
        })
    }
}