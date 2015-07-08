$(document).delegate('*[data-toggle="lightbox"]', 'click', function(e) {
	e.preventDefault();

	return $(this).ekkoLightbox({
		onContentLoaded: function () {
			var lightbox = this,
				modalFooter = $(lightbox.modal_content).find('.modal-footer'),
				group = lightbox.gallery;

			if (group && lightbox.gallery_items.length > 1) {
				//If we have a group with more images than one, create a footer with clickable thumbnails
				var newModalThumbContainer = $("<div></div>").addClass("modal-footer-thumbnails");

				$('*[data-gallery="' + group + '"] img').each(function () {
					//for each thumbnail on page
					var src = $(this).attr("src").replace(/(\?width=)[^\&]+/, ""), //source of thumbnail without width in url
						position = $(this).parent().index(), //the index of the image among its siblings
						newThumbnail = $("<img></img>").attr("src", src + "?width=75"), //Create a new image with a smaller width
						newLink = $("<a></a>").attr("title", "View image " + (position + 1)).append(newThumbnail).on("click", function () {
							//Create a new link, and when you click it: change position to that image
							lightbox.navigateTo(position);
						});

					if (position === lightbox.gallery_index) {
						//Highlight the current image in footer
						newThumbnail.addClass("current");
					}

					newModalThumbContainer.append(newLink);
				});

				//The modal footer is hidden by default
				modalFooter.show().html(newModalThumbContainer);
			}
		}
	});
});