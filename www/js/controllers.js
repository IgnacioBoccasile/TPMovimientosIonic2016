angular.module('starter.controllers', ['ngCordova'])

.controller('AutorCtrl', function($scope) {})

.controller('MoverCtrl', function($scope, $state, $ionicPlatform, $stateParams, $cordovaNativeAudio, $cordovaDeviceMotion, $cordovaMedia) {
	
	$scope.x;
	$scope.y;
	$scope.z;  
	$scope.timestamp;

	$scope.voltearArriba=0;
	$scope.voltearAbajo=0;
	$scope.moverAbajo=0;
	$scope.moverArriba=0;
	$scope.moverIzquierda=0;
	$scope.moverDerecha=0;
	
	$scope.imagen= "img/Reptile.png";

	var options = { frequency: 1000 };
	
	document.addEventListener("deviceready", function () 
	{
		var watch = $cordovaDeviceMotion.watchAcceleration(options);
		watch.then
		(
			null,
			
			function(error) 
			{
				console.log(error);
			},
			
			function(result) 
			{
				if(result.x > 5 && $scope.moverIzquierda==0) 
				{
					$cordovaNativeAudio.play('MoverIzquierda');
					$scope.imagen= "img/Reptile.png";

					$scope.voltearArriba=0;
					$scope.voltearAbajo=0;
					$scope.moverAbajo=0;
					$scope.moverArriba=0;
					$scope.moverIzquierda=1;
					$scope.moverDerecha=0;

					$scope.x= result.x;
					$scope.y= result.y;
					$scope.z = result.z;
				}
				
				if(result.x < -5 && $scope.moverDerecha==0)
				{
					$cordovaNativeAudio.play('MoverDerecha');
					$scope.imagen= "img/Reptile.png";

					$scope.voltearArriba=0;
					$scope.voltearAbajo=0;
					$scope.moverAbajo=0;
					$scope.moverArriba=0;
					$scope.moverIzquierda=0;
					$scope.moverDerecha=1;
				}
				
				if(result.y > 5 && $scope.moverAbajo==0)
				{
					$cordovaNativeAudio.play('MoverAbajo');
					$scope.imagen= "img/Reptile.png";

					$scope.voltearArriba=0;
					$scope.voltearAbajo=0;
					$scope.moverAbajo=1;
					$scope.moverArriba=0;
					$scope.moverIzquierda=0;
					$scope.moverDerecha=0;
				}

				if(result.y < -5 && $scope.moverArriba==0)
				{
					$cordovaNativeAudio.play('MoverArriba');
					$scope.imagen= "img/Reptile.png";

					$scope.voltearArriba=0;
					$scope.voltearAbajo=0;
					$scope.moverAbajo=0;
					$scope.moverArriba=1;
					$scope.moverIzquierda=0;
					$scope.moverDerecha=0;
				}
     
				if(result.x <1 && result.x >-1 && result.y <1 && result.y >-1)
				{
					$scope.imagen= "img/Reptile.png";
				}
       
				if(result.z > 10.1 && result.z < 10.9 && $scope.voltearArriba==0)
				{
					try
					{
						$cordovaNativeAudio.play('Arriba');
					}
					
					catch(Exception)
					{
						console.log(Exception.Message);
					}

					$scope.voltearArriba=1;
					$scope.voltearAbajo=0;
					$scope.moverAbajo=0;
					$scope.moverArriba=0;
					$scope.moverIzquierda=0;
					$scope.moverDerecha=0;
				}
  
				if(result.z < -9 && result.z > -10 && $scope.voltearAbajo ==0)
				{
					try
					{
						$cordovaNativeAudio.play('Abajo');
					}
					
					catch(Exception)
					{
						console.log(Exception.Message);
					}

					$scope.voltearArriba=0;
					$scope.voltearAbajo=1;
					$scope.moverAbajo=0;
					$scope.moverArriba=0;
					$scope.moverIzquierda=0;
					$scope.moverDerecha=0;
				}
			});
	}, false);
})


.controller('InicioCtrl', function($scope, $cordovaNativeAudio, $cordovaVibration, $timeout, $ionicPlatform) {
	
	$scope.bandera = false;
	
	$scope.MisMensajes=[];
	
	var messagesRef = new Firebase('https://tpmovimientos.firebaseio.com/Usuarios');
	
	$scope.miBoton = function()
	{
		try
		{
			$cordovaVibration.vibrate(30);
			
			$cordovaNativeAudio.play('Guardar');
		}
		
		catch(Exception)
		{
			console.log(Exception.Message);
		}
		
		$scope.bandera = true;
		
		var nombre = $('#nombre').val();
		
		messagesRef.push({usuario:nombre});
	}
	
	messagesRef.on('child_added', function (snapshot) 
	{
		$timeout(function()
		{
			var message = snapshot.val();
			
			$scope.MisMensajes.push(message);
		});
	});	
});