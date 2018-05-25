'use strict';

angular.module('smogApp')

    .factory('mainModel', ['$http','googleMap', function($http,googleMap) {

        var factory = {};
        factory.info = 'Proszę czekać trwa wczytywanie danych!';

        factory.get = function() {
          $http.get('/mainModel').then(function successCallback(response) {
            if (response.data === 'server not available') {
              factory.show = false;
              factory.info = 'Pobranie danych jest teraz niemożliwe, spróbuj później.';
            } else if (response.status === 200) {
              factory.show = true;
              factory.info = 'Dane zostały wczytane!';
              for (let i = 0, len = response.data.length; i < len; i++) {
                googleMap.addMarkers(response.data[i]);
              };
            }
          });
        };

        factory.getView = function() {
          factory.view = true;
        };

        factory.get();

        return factory;

    }]);
