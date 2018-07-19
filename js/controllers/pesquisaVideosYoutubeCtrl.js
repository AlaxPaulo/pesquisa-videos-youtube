angular.module("pesquisaVideosYoutube").controller("pesquisaVideosYoutubeCtrl", function($scope,$q,$http,$sce){
    
    var url_youtube_api = "https://content.googleapis.com/youtube/v3/search?maxResults=50&order=viewCount&part=snippet&publishedAfter=2015-01-01T00%3A00%3A00Z&type=video";
    var chave_youtube = "AIzaSyD7l4UP_gD7Fhn-5x1oP8EfLSK0vLfSFF4";
    var url_chamada;
    var videos = [];

    $scope.app = "Pesquisa de videos no ";
    $scope.appDescricao = "Aplicação criada pra consumir a API do YouTube utilizando ";
    $scope.videos = [];
    $scope.titulo = "";

    $scope.trustSrcurl = function(data) 
    {
        return $sce.trustAsResourceUrl(data);
    }
       
    var pequisarVideosYouTube = function (){
        
        var promessa = $q.defer();
        var q = $scope.titulo;
        url_chamada = url_youtube_api +"&key=" + chave_youtube + "&q=" + encodeURIComponent(q).replace(/%20/g,"+"); 
        videos = [];
        $http.get(url_chamada).then(function(response){
            angular.forEach(response.data.items, function (item){
                var video = {
                    titulo: item.snippet.title,
                    descricao: item.snippet.description,
                    url: "https://www.youtube.com/embed/" + item.id.videoId,
                    id: item.id.videoId
                }
                videos.push(video);
            })

        });
        $scope.videos = videos;
        console.log($scope.videos);
        return promessa.promise;
    }

    var carregarVideosIndex = function(){
        if($scope.titulo == ""){
            pequisarVideosYouTube();
        };
    };

    $scope.carregarVideos = function(){
        pequisarVideosYouTube();
    };

    carregarVideosIndex();
    
});
