$(document).ready(function(){
        $.ajax({
            // url:'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json',
            url:'patientDetails.json',
            type:'GET',
            dataType:'json',
            timeout:2500,
            success: function(result){
                console.log(" Complete with success and data",result);
				console.log("Complete patient name",result.length);
				
                for (var i = 0; i <result.length; i++) {
				  $('#patientDetails').append('<li id="patientList">'+'<img src="girl.jpg" width="40px" height="40px">'+result[i].Patient+
					 '<p>'+' PID:  '+result[i].PID+' ID:  '+result[i].Id+' DOB:  '+result[i].DOB +'</p></li>')
				  $( "p" ).addClass( "patientInfo-bg" );
					}
        
            },
            error:function(result){
                console.log(" Complete with error",result);
                alert("Something went wrong...!");
            },
            complete:function(result){
                console.log(" Complete",result);
            },
        });
		$('#postDataVal').click(function(){
			var patientName=document.getElementById('Patient').value;
			var pidData=document.getElementById('PID').value;
			var dateOFBirth=document.getElementById('DOB').value;
			$.post("postPatient.php",
			{
				Patient: patientName,
				PID : pidData,
				DOB : dateOFBirth
			},
			function(data,status){
				$('#patientDetails').append('<li id="patientList">'+'<img src="girl.jpg" width="40px" height="40px">'+patientName+
						'<p class="patientInfo-bg">'+' PID:  '+pidData+' ID:  '+pidData+' DOB:  '+dateOFBirth +'</p></li>')
			
				alert( data + " \n Status: " + status);
				console.log(data);
			});
	
				
		});
		$.ajaxSetup({ cache: false });
			$('#search').keyup(function(){
				$('#patientDetails').html('');
				var getValue = this.value.toLowerCase();
				console.log("getValue : ",getValue);
				var getValue_Length  = this.value.length;
				console.log("getValue_Length : ",getValue_Length);
				var searchField = $('#search').val();
				var expression = new RegExp(searchField, "i");
				console.log("expression",expression);
				$.getJSON('patientDetails.json', function(data) {
					$.each(data, function(key, value){
						if (value.Patient.search(expression) != -1)
						{
							$('#patientDetails').append('<li id="patientList">'+'<img src="girl.jpg" width="40px" height="40px">'+'<strong>' + value.Patient.substr(0, getValue_Length) + '</strong>'+value.Patient.substr(getValue_Length)+
								'<p class="patientInfo-bg">'+' PID:  '+value.PID+' ID:  '+value.Id+' DOB:  '+value.DOB +'</p></li>')
					
						
						}
						else if(value.PID.search(expression) != -1 || value.Id.search(expression) != -1 || value.DOB.search(expression) != -1){
							$('#patientDetails').append('<li id="patientList">'+'<img src="girl.jpg" width="40px" height="40px">'+value.Patient+
								'<p class="patientInfo-bg">'+' PID:  '+value.PID+' ID:  '+value.Id+' DOB:  '+value.DOB +'</p></li>')
					
						}
					});   
				});
		});

		
			
    
	// $('#search').keyup(function () {
	// 	var getValue = this.value.toLowerCase();
	// 	console.log("getValue : ",getValue);
	// 	var getValue_Length  = this.value.length;
	// 	console.log("getValue_Length : ",getValue_Length);

	//     $('#patientDetails>li').each(function () {
	// 		var listData  = $(this).text();
	// 		var listData_lowerCase = listData.toLowerCase();
	// 		var splitData=listData.split('PID');
	// 		var searchField = $('#search').val();
	// 		var expression = new RegExp(searchField, "i");
	// 		console.log("expression : ",expression);
	// 		var listValue ='<img src="girl.jpg" width="40px" height="40px">'+ '<strong>' + splitData[0].substr(0, getValue_Length) + '</strong>' +
	// 		 splitData[0].substr(getValue_Length)+'<p class="patientInfo-bg">'+'PID '+splitData[1]+'</p>';
	// 		(listData_lowerCase.indexOf(getValue) == 0) ? $(this).html(listValue).show() : $(this).hide();
	// 	});
	// 	// $('#patientDetails>li>p').each(function () {
		
	// 	// 	var parainfo  = $(this).text();
	// 	// 	var listPatient = $("#patientDetails>li").text();
	// 	// 	// console.log("Patient list : ",listPatient);
	// 	// 	var patientListData = parainfo
	// 	// 	console.log("parainfo : ",parainfo);
	// 	// 	console.log("parainfo.indexOf(getValue) : ",parainfo.indexOf(getValue));
	// 	// 	if(parainfo.indexOf(getValue) == 7){
	// 	// 		$(this).html(patientListData).show()
	// 	// 	}
	// 	// 	else{
	// 	// 		$(this).hide()
	// 	// 	}
	//     // });

	// });
	$("#search").click(function(){
	   if($("#patientDetails").css('display')=="none"){
	    	$("#patientDetails").show();
	   }
	   else{
	    	$("#patientDetails").hide();

	   }

	});
	$("#dropdownMenu").click(function(){
		if($("#patientDetails").css('display')=="none"){
			 $("#patientDetails").show();
		}
		else{
			 $("#patientDetails").hide();
 
		}
 
	 });
	 $('#patientDetails').on('click', 'li', function() {
		var selected = $(this).text();
		var clicked_txt = selected.split('PID');
		var selectedText=clicked_txt[0]
		$('#search').val(selectedText);
	 });

});



$(document).click(function (e) {
    e.stopPropagation();
    var container = $(".input-group");
	// console.log("container : ",container);
    //check if the clicked area is dropDown or not
    if (container.has(e.target).length === 0) {
        $('#patientDetails').hide();
    }
})
