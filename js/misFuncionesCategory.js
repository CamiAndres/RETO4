function traerInformacionCategories(){
    console.log("test");
        $.ajax({
        //url:"http://168.138.127.125:8080/api/Category/all",
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategories("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategory("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}


function guardarInformacionCategories(){
   
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
   
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        url:"http://localhost:8080/api/Category/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        
        //url:"http://168.138.127.125/api/Category/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Guardó correctamente");
            alert("Guardó correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No guardó correctamente");
    
    
        }
        });}

}

function actualizarInformacionCategories(idElemento){
    
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://168.138.127.125:8080/api/Category/update",
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategories();
            alert(" La categoria se actualizó")
        }
    });}

}

function borrarCategory(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        //url:"http://168.138.127.125:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCategories();
            alert("Se eliminó correctamente.")
        }
    });

}
