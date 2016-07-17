var app = angular.module('app',['ngRoute', 'ngCookies']);

var model = {
	user:"Gal"
};

app.run(function($http){   // Get All Items
	$http.get("http://letrangerfinal/herokuapp.com/getAllItems").success(function(data){
		model.items = data;
	})
})

app.run(function($http){   // Get All Designers
	$http.get("http://letrangerfinal/herokuapp.com/getAllDesigners").success(function(data){
		model.designers = data;
	})
})

app.run(function($http){   // Get All Categories
	$http.get("http://letrangerfinal/herokuapp.com/getAllCategories").success(function(data){
		model.categories = data;
	})
})

app.run(function($http, $cookies){   // Get All Likes
	likes=$cookies.getObject('likes') || {};
		$http.post("http://letrangerfinal/herokuapp.com/getAllLikes", likes).success(function(data){
			model.likes=data;
		})
})



app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
            
    when('/Designer/:designer', {
       templateUrl: 'designer.htm',
        controller: 'designerController'
    }).
            
    when('/Category/:category', {
        templateUrl: 'category.htm',
        controller: 'categoryController'
    });

}]);
                
app.controller('designerController', function($scope, $routeParams) {
  	$scope.designer = $routeParams.designer;
  	$scope.message = $routeParams.designer;
	var resultArr = [];
	angular.forEach($scope.todo.items, function(item){
		resultArr.push(item);
	});
});
         
app.controller('categoryController', function($scope, $routeParams) {
	$scope.category = $routeParams.category;
    $scope.message = $routeParams.category;
	var resultArr = [];
	angular.forEach($scope.todo.items, function(item){
		resultArr.push(item);
	});
});

app.controller('statisticsController', function($scope, $routeParams) {
  	$scope.designer = $routeParams.designer;
  	$scope.message = $routeParams.designer;
	var resultArr = [];
	angular.forEach($scope.todo.items, function(item){
		if(item.designer==designer){
			resultArr.push(item);
		}
	});
});



app.controller('myCtrl', function($scope, $http, $cookies, $location){

	$scope.todo = model;

	$scope.connected = ($cookies.get("connected") === "true") || false;
	$scope.usermail = $cookies.get("usermail") || ""; 
	$scope.password = $cookies.get("password") || "";
	$scope.username = $cookies.get("username") || ""; 
    $scope.isDesigner = ($cookies.get("isDesigner") === "true") || false;
    $scope.likes = $cookies.getObject('likes') || {};

    $scope.checkLogin = function(){
    	console.log("Checking Login");
        var data = {
            'email': $scope.usermail,
            'password': $scope.password
        };
        $http.post('http://letrangerfinal/herokuapp.com/login', data)
            .success(function(data){
                	$scope.connected = true;
                    $scope.usermail = data.email;
                    $scope.password = data.password;
                    $scope.username = data.username;
                    $scope.isDesigner = data.designer;
                    $scope.likes = data.likes;

                    model.likes = data.likes;

                    $cookies.put("connected",  true); 
                    $cookies.put("usermail",  data.email);
                    $cookies.put("password",  data.password);
                    $cookies.put("username",  data.username);
                    $cookies.put("isDesigner",  data.designer); 
                    $cookies.putObject("likes",  data.likes); 
                    $scope.footer=0;
                    console.log($scope.likes);
                    console.log("Connected Successfully");
                    location.reload();
        });
    };

    $scope.logout = function(){
    	$scope.connected=0;
    	$cookies.remove("connected"); 
        $cookies.remove("usermail");
        $cookies.remove("password");
        $cookies.remove("username");
        $cookies.remove("isDesigner"); 
        $cookies.remove("likes"); 
        location.reload();
        console.log("Logout Successfully");
    }

    $scope.addToFavorites = function(itemId){
    	console.log("add To Favorites");
		console.log(itemId);
		var data = {
			'itemId': itemId,
			'email' : $cookies.get("usermail")
		}
        $http.post('http://letrangerfinal/herokuapp.com/addToFavorites', data)
            .success(function(data){
                    console.log("Added to Favorites Successfully");
                    var data = {
           			 'email': $cookies.get("usermail"),
            		 'password': $cookies.get("password")
        			};
        			// Get Updated Likes
                    $http.post('http://letrangerfinal/herokuapp.com/login', data)
         			   .success(function(data){
         			   	    model.likes = data.likes;
         			   	    $cookies.putObject("likes",  data.likes); 
         			   	});
        });
        //$location.path();
        $location.path('/favorits.html');
    };

    $scope.rmFromFavorites = function(itemId){
    	console.log("Remove from Favorites");
		console.log(itemId);
		var data = {
			'itemId': itemId,
			'email' : $cookies.get("usermail")
		}
        $http.post('http://letrangerfinal/herokuapp.com/rmFromFavorites', data)
            .success(function(data){
                    console.log("Remove from Favorites Successfully");
                    var data = {
           			 'email': $cookies.get("usermail"),
            		 'password': $cookies.get("password")
        			};
        			// Get Updated Likes
                    $http.post('http://letrangerfinal/herokuapp.com/login', data)
         			   .success(function(data){
         			   	    model.likes = data.likes;
         			   	    $cookies.putObject("likes",  data.likes); 
         			   	});
        });
    };

    $scope.checkLike = function(itemId){
    	var check = false;
    	angular.forEach($scope.todo.likes, function(item){
    		if(itemId==item.id){
    			check = true;
    		};
   	    });
   	    return check;
    };

	$scope.incompleteCount = function(itemNum){
		var count = 0;
		angular.forEach($scope.todo.items, function(item){
			if(itemNum==1){
				count++;}
		});
		return count;
	};

	$scope.addNewProduct = function(productName, productPrice, productDesigner, productImg){
    	console.log("add New Product");
		console.log(productName+productPrice+productDesigner+productImg);
		var data = {
			'name': productName,
			'price': productPrice,
			'id': '400',
			'designer': productDesigner,
			'new': true,
			'img_url': productImg,
		}
        $http.post('http://letrangerfinal/herokuapp.com/addNewProduct', data)
            .success(function(data){
                    console.log("Added to Favorites Successfully");
        });
    };

    $scope.reset = function() {
    	$scope.master = {usermail:"", password:""};
        $scope.user = angular.copy($scope.master);
    };
})




// Query Filters

app.filter("checkedItems", function(){
	return function(items, showComplete){
		var resultArr = [];
		angular.forEach(items, function(item){
			if(item.designer==showComplete){
				resultArr.push(item);
			};
		});
		return resultArr;
	};
});

app.filter("designerItems", function(){
	return function(items, designer){
		var resultArr = [];
		if(designer=="All"){
			angular.forEach(items, function(item){
				resultArr.push(item);
			});
		}
		angular.forEach(items, function(item){
			if(item.designer==designer){
				resultArr.push(item);
			};
		});
		return resultArr;
	};
});

app.filter("categoryItems", function(){
	return function(items, category){
		var resultArr = [];
		if(category=="All"){
			angular.forEach(items, function(item){
				resultArr.push(item);
			});
		}
		
		angular.forEach(items, function(item){
			//len = categories.length;
			for (i=0; i<13; i++) {
				if(item.categories[i]==category){
					resultArr.push(item);
				};
			};
		});
		return resultArr;
	};
});
