function autoInicioCategory(){
    console.log("se esta ejecutando")
    $.ajax({
        //url:"http://168.138.247.22:80/api/Category/all",
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionAudience() {
    $.ajax({
        //url:"http://168.138.247.22:80/api/Skate/all",
        url: "http://localhost:8080/api/Audience/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaAudience(response);
        }

    });

}

function pintarRespuestaAudience(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Owner</td>";
        myTable+="<td>Capacity</td>";
        myTable+="<td>Name</td>";
        myTable+="<td>Description</td>";
        myTable+="<td>Category</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].owner + "</td>";
        myTable+="<td>" + response[i].capacity + "</td>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonAudience2" onclick="borrar(' + response[i].id + ')">Borrar Audience!</button></td>';
        myTable+='<td><button class = "botonAudience2" onclick="cargarDatosAudience(' + response[i].id + ')">Editar Audience!</button></td>';
        myTable+='<td><button class = "botonAudience2" onclick="actualizar(' + response[i].id + ')">Actualizar Audience!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaAudience").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosAudience(id) {
    $.ajax({
        dataType: 'json',
        //url:"http://168.138.247.22:80/api/Skate/"+id,
        url: "http://localhost:8080/api/Audience/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#owner").val(item.name);
            $("#capacity").val(item.brand);
            $("#name2").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarAudience() {

    if($("#name2").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                owner: $("#owner").val(),
                capacity: $("#capacity").val(),
                name: $("#name2").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                //url:"http://168.138.247.22:80/api/Skate/save",
                url: "http://localhost:8080/api/Audience/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#owner").val("");
                    $("#capacity").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            //url:"http://168.138.247.22:80/api/Skate/"+idElemento,
            url: "http://localhost:8080/api/Audience/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaAudience").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#owner").val().length == 0 || $("#capacity").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            owner: $("#owner").val(),
            capacity: $("#capacity").val(),
            name: $("#name2").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            //url:"http://168.138.247.22:80/api/Skate/update",
            url: "http://localhost:8080/api/Audience/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaAudience").empty();
                listarAudience();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#owner").val("");
                $("#capacity").val("");
                $("#name2").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
