app.directive('chunkcontainer', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var id = attrs.id
            scope.$watchCollection('selectedChunk',function(newValue,oldValue){
               if(newValue && newValue!=oldValue){
                 if(newValue.id==null){
                   element[0].style['z-index'] = 1;
                   element[0].style.transform = 'translate3d('+ (attrs.index*295) +'px, 0px, 0px)'
                 }else if(newValue.id != id && attrs.index > newValue.index){
                   element[0].style.transform = 'translate3d('+ ((attrs.index*295)+87) +'px, 0px, 0px)'
                 }else if(newValue.id == id){
                   element[0].style.transform = 'translate3d('+ (attrs.index*295) +'px, 0px, 0px)'
                   element[0].style['z-index'] = 2;
                 }
               }
            });
        }
    }
});
