var appControllers = angular.module('appControllers', ['firebase'])
    //global variables
    .value('success',false)
    .controller('faqController', function(faqFactory, $scope,success, $timeout, firebaseUrl, $firebaseArray, $firebaseObject, $location){
        $scope.success = success;
        $scope.faqs = faqFactory.FAQS;
        $scope.faq = {};

        $scope.getFaq = function () {
            $scope.faqs = faqFactory.get();
        };
        $scope.addFaq = function () {
            faqFactory.add({
                    question: $scope.faq.question,
                    answer: $scope.faq.answer,
                    category: $scope.faq.category
            }).then(function () {
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false
                }, 3000);
            })
        };
        $scope.deleteFaq = function (id) {
            faqFactory.delete(id);
        };
        $scope.editFaq = function () {
            faqFactory.update({
                question: $scope.faq.question,
                answer: $scope.faq.answer,
                category: $scope.faq.category
            }).then(function () {
                $scope.edit_faq_form.$setPristine();
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false;
                    $timeout(function () {
                        $location.path('/view-faqs');
                    }, 1000)
                }, 3000);
                $scope.new = {};
            });
            // $scope.edit_faq_form.$setPristine();
            // $scope.faq = {};
            // $location.path('/view-faqs');
        };

        $scope.getFaq();
    })
    .controller('advertController', function(advertFactory,$scope,$timeout, $firebaseArray, firebaseUrl, $firebaseObject, $location){
        var adverts = new Firebase(firebaseUrl + "advert/");
        $scope.adverts = advertFactory.ADVERTS;
        $scope.advert = {};

        $scope.getAdvert = function () {
            $scope.adverts = advertFactory.get();
        };
        $scope.addAdvert = function () {
            advertFactory.add({
                advert: $scope.advert.advert,
                validity_period: $scope.advert.validity_period,
                image: $scope.advert.image,
                category: $scope.advert.category,
            }).then(function () {
                $scope.success = true
                $timeout(function () {
                    $scope.success = false
                }, 3000);
            });
        };
        $scope.deleteAdvert = function (id) {
            console.log(id);
            advertFactory.delete(id);
        };
        $scope.editAdvert = function () {
            advertFactory.update({
                advert: $scope.advert.advert,
                validity_period: $scope.advert.validity_period,
                image: $scope.advert.image,
                category: $scope.advert.category,
            }).then(function () {
                $scope.edit_advert_form.$setPristine();
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false;
                    $timeout(function () {
                        $location.path('/view-adverts');
                    }, 1000)
                }, 3000);
                $scope.advert = {};
            });
        };
        $scope.getAdvert();
    })
    .controller('serviceController', function(serviceFactory ,$scope,$timeout, $firebaseArray, firebaseUrl, $firebaseObject, $location){
        var services = new Firebase(firebaseUrl + "service/");
        $scope.services = serviceFactory.SERVICES;
        $scope.service = {};

        $scope.getServices = function () {
            $scope.services = serviceFactory.get();
            // $scope.services = $firebaseArray(services);
        };

        $scope.addService = function () {
            serviceFactory.add({
                service_name: $scope.service.service_name,
                category: $scope.service.category,
            }).then(function () {
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false
                }, 3000);
            });
        };
        $scope.deleteService = function (id) {
            serviceFactory.delete(id);
        };

        $scope.editService = function () {
            serviceFactory.update({
                service_name: $scope.service.service_name,
                category: $scope.service.category,
            }).then(function () {
                $scope.edit_service_form.$setPristine();
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false
                    $timeout(function () {
                        $location.path('/view-services');
                    }, 1000)
                }, 3000);
                $scope.service = {};
            });
        };
        $scope.getServices();
    })
    .controller('newsController', function( newsfactory,$scope, $firebaseArray,$timeout, firebaseUrl, $firebaseObject, $location){
    $scope.news = newsfactory.NEWS;
    $scope.new = {};
    $scope.success = false;

    $scope.getNews = function () {
        $scope.news = newsfactory.get() ;
        console.log($scope.news)
    };

    $scope.addNews = function () {
        // var new_s = $firebaseArray(news);
        newsfactory.add({
            photoUrl: $scope.new.photoUrl,
            title: $scope.new.title,
            description: $scope.new.description,
            date: new Date().toDateString(),
            category: $scope.new.category
        }).then(function () {
            $scope.success = true;
            $timeout(function () {
                $scope.success = false
            }, 3000);
        });
    };

    $scope.deleteNew = function (id) {

        newsfactory.delete(id);
    };

    $scope.editNew = function () {

        newsfactory.update({
            photoUrl: $scope.new.photoUrl,
            title: $scope.new.title,
            description: $scope.new.description,
            date: new Date().toDateString(),
            category: $scope.new.category
        }).then(function () {
            $scope.edit_news_form.$setPristine();
            $scope.success = true;
            $timeout(function () {
                $scope.success = false
                $timeout(function () {
                    $location.path('/view-news');
                }, 1000)
            }, 3000);
            $scope.new = {};
        });
    };

    $scope.getNews();
})
    .controller('eventController', function( eventFactory,$scope,$timeout, $firebaseArray, firebaseUrl, $firebaseObject, $location, $routeParams ){
        $scope.events = eventFactory.EVENTS;
        $scope.event = {};
        $scope.success = false;

        $scope.getEvents = function () {
            $scope.events = eventFactory.get();
        };

        $scope.addEvent = function () {
            // var event = $firebaseArray(events);
            eventFactory.add({
                title: $scope.event.title,
                description: $scope.event.description,
                date: $scope.event.date.toDateString(),
                images: $scope.event.photoUrl,
                category: $scope.event.category
            }).then(function () {
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false;
                }, 3000);
            });
        };

        $scope.deleteEvent= function (id) {
            eventFactory.delete(id);
        };

        $scope.editEvent = function () {

            eventFactory.update({
                title: $scope.event.title,
                description: $scope.event.description,
                date: $scope.event.date,
                images: $scope.event.photoUrl,
                category: $scope.event.category
            }).then(function () {
                $scope.edit_event_form.$setPristine();
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false;
                    $timeout(function () {
                        $location.path('/view-events');
                    }, 1000)
                }, 3000);
                $scope.event = {};
            }),function (error) {
                console.log('error occured');
            };
        };

        $scope.getEvents();

    })
    .controller('yearController', function ($scope, yearFactory) {
        $scope.currentYear = yearFactory.currentYear().getFullYear();
    });
