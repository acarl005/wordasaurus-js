// Create the close button
var closebtn = $('<button/>', {
    type: 'button',
    text: 'x',
    id: 'close-preview',
});

closebtn.attr('class', 'close pull-right');

module.exports = function imageText() {
  return {
    restrict: 'E',
    templateUrl: '/directives/image-text.html',
    controller: ['$scope', function($scope) {
      $scope.recognize = function(preview) {
        var file = this.files[0];
        $scope.ctrl.bars = true
        Tesseract.recognize(file)
        .progress(function(p) {
          $scope.$apply(function() {
            if (p.status === 'initializing api') {
              $scope.ctrl.api = p.progress * 100
            } else if (p.status === 'recognizing text') {
              $scope.ctrl.text = p.progress * 100
            }
          })
        })
        .then(function(result) {
          $scope.$apply(function() {
            $scope.ctrl.bars = false
            $scope.ctrl.api = null
            $scope.ctrl.text = null
          })
          preview.find(".image-preview-input-title").text("Change");
          preview.find(".image-preview-clear").show();
          preview.find(".image-preview-filename").val(file.name);
          preview.attr("data-content", result.text).popover("show");
        })
      }
    }],
    link: function(scope, elem, attr) {
      var preview = elem.find('.image-preview')
      $(elem).on('click', '#close-preview', function() {
        preview.popover('hide');
        // Hover befor close the preview
        preview.hover(
          function () {
            preview.popover('show');
          },
          function () {
            preview.popover('hide');
          }
        );
      });

      preview.popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
      });

      // Clear event
      elem.on('click', '.image-preview-clear', function() {
        preview.attr("data-content","").popover('hide');
        preview.find('.image-preview-filename').val("");
        preview.find('.image-preview-clear').hide();
        preview.find('.image-preview-input input:file').val("");
        preview.find(".image-preview-input-title").text("Browse");
      });

      // Create the preview image
      preview.on('change', '.image-preview-input input:file', function() {
        scope.recognize.call(this, preview)
      });
    }
  };
};
