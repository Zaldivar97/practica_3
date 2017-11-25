$(document).ready(function(){
$.ajax({
   headers: {'X-Auth-Token':'a8bf7dab07d247ba9ea5b4bc23663c2b'},
   url:'http://api.football-data.org/v1/competitions',
   dataType:'json',
   type:'GET'
    
}).done(function (response) {
       $.map(response,function (valor,index) {
           $("#cmbLiga").append("<option value="+valor.id+">"+valor.caption+"</option>");
        });
    });
});


$("#cmbLiga").change(function() {
    $("#cmbEquipo").html("");
$.ajax({
   headers: {'X-Auth-Token':'a8bf7dab07d247ba9ea5b4bc23663c2b'},
   url:'http://api.football-data.org/v1/competitions/'+this.value+'/teams',
   dataType:'json',
   type:'GET'
    
}).done(function (response) {
       $.map(response.teams,function (valor,index) {
           $("#cmbEquipo").append("<option value="+valor._links.players.href+">"+valor.name+"</option>");
        });
    });
});

$("#cmbEquipo").change(function () {
    $(".divJugadorContainer").html("");
    $.ajax({
   headers: {'X-Auth-Token':'a8bf7dab07d247ba9ea5b4bc23663c2b'},
   url: this.value,
   dataType:'json',
   type:'GET'
    
}).done(function (response) {
    if(response.players.lenght===0){
        $(".divJugadorContainer").append("<p class=\"alert alert-danger\" role=\"alert\">No existen jugadores en la plantilla</p>");
    }else{
       $.map(response.players,function (valor,index) {
           
           $(".divJugadorContainer").append('<div class="col-sm-4 text-center well well-lg"><p class="alert alert-success">'+valor.name+'</p><p>Nacimiento: '+valor.dateOfBirth+'</p><p>Nacionalidad: '+valor.nationality+'</p><p>'+valor.position+'</p><p>Contratado hasta: '+valor.contractUntil+'</p></div>');
        });
    }
    });
});
