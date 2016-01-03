/**
 * All HTML CSS Javascript that is in 2D goes here
 */
var Pannel = {
    updateHealthBar: function(width){
        $("#health_filler").width(width + "%");
    },
    updateKill: function(killed, killer){
        //Killed and killer contain the names of the two players
        $("#info_pannel").prepend('<div class="info_kill"><span class="killer">'+ killer +'</span> killed <span class="killed">'+ killed +'</span></div>');
    },
    updatePlayerJoind: function(name){ 
        $("#info_pannel").prepend('<div class="info_kill">'+ name +' joined</div>');
    },
    updatePlayerLeft: function(name){ 
        $("#info_pannel").prepend('<div class="info_kill">'+ name +' left</div>');
    },
    showGunPointer: function(){
        $("#gunsight").show();
    },
    hideGunPointer: function(){
        $("#gunsight").hide();
    },
    hideUserInput: function(){
        $("#enter_user_name").fadeOut();
    },
    hideDeadPannel: function(){
        $("#you_are_dead").hide(); 
    }, 
    showDeadPannel: function(){
        $("#you_are_dead").fadeIn();
    },
    toggleStats: function(remotePlayers, localPlayer){
        //players => containing all players
        //localID => containing ID of the local Player to highlight
        if($("#stats").css('display') == 'none' ){
            //"soft" clone the array
            var allPlayers = remotePlayers.slice(0);
            //Sort players by how good the are^
            allPlayers.push(localPlayer); 
            allPlayers.sort(function(a,b){
                var difA = a.getDiff();
                var difB = b.getDiff();
                if (difA < difB)
                    return 1;
                if (difA > difB)
                    return -1;
                // a must be equal to b
                return 0; 
            });
            //Reset Table
            $("#stats table tbody").html("");
            //Add players
            for(var i = 0; i < allPlayers.length ; i++){
                var rank = i + 1; 
                
                var classLocal = "";
                if(allPlayers[i].getID() == localPlayer.getID())
                    classLocal = "localPlayer";

                $("#stats table tbody").append('<tr class="'+ classLocal +'"><td>'+ rank +'</td><td>'+ allPlayers[i].getName() +'</td><td align="right">'+ allPlayers[i].getKills() +'</td><td align="right">'+ allPlayers[i].getDeaths() +'</td><td align="right">'+ allPlayers[i].getDiff() +'</td></tr>');
            } 
            
            $("#stats").show();
        }
        else{
            $("#stats").hide();
        }

    },
    updateAmo: function(size){
        $("#currAmo").html(size);
    }
    
} 

//Other Event Handlers for 2D Buttons and so on ....
//===========================================================
$("#submit_user_name").click(function(){
    var userName = $("#input_user_name").val();
    if(userName != ""){
        sendUserName(userName);
    }
});