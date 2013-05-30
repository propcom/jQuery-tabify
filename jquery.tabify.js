(function($) {
	function Tab($tab, $pane) {
		var self = this;
		this.$tab = $tab;
		this.$pane = $pane;

		this.$tab.on('click', function() {
			self.select();
		});

		this.$tab.on('select-tab',function() {
			var name;
			if (name = self.name()) {
				window.location.hash = '#' + name;

				if ($('.js-current-tab').length) {
					$('.js-current-tab').val(name);
				}
			}
		});
	}

	Tab.prototype = {
		name: function() {
			return this._name || this.$tab.data('name') || this.$pane.data('name');
		},
		select: function() {
			this.$pane.siblings().each(function() {
				$(this).removeClass('current');
			});
			this.$tab.siblings().each(function() {
				var $it = $(this);
				$it.removeClass('selected');
				$it.trigger('deselect-tab');
			});

			this.$pane.addClass('current');
			this.$tab
				.addClass('selected') 
				.trigger('select-tab');
		}
	};

    $.fn.tabify = function(options) {
        var $elem = this;

		if ($elem.length > 1) {
			$elem.each(function(options) {
				$(this).tabify();
			});

			return;
		}

		options = $.extend({
			'tab_container_class' => 'nav nav-tabs',
			'tab_content_class' => 'tab-content',
		}, options);
        var $tabs = $('<ul />');

		$tabs.addClass(options.tab_container_class);

        $elem.find('.js-tab').not($elem.find('.js-tabs .js-tab')).each(function(i) {
            var $self = $(this);
            var $title = $self.find('.js-title').eq(0);

            if (! $title.length) {
                $title = $self.find(':header').eq(0);
            }

            var $tab = $('<li />');
            $tab.html($title.html());
            $title.remove();
            $tabs.append($tab);

			var tab = new Tab($tab, $self);
			$tab.data('tab', tab);
			$self.data('tab', tab);

            if (i==0) {
				$tab.addClass('selected');
				$self.addClass('current');
            };
        });

        $elem.prepend($tabs);

		$(function() {
			var uri_tab = window.location.hash.substr(1);
			function wanted() {
				return $(this).data('tab').name() == uri_tab;
			}

			if (uri_tab) {
				// TODO: A refactor would make this cleaner.
				var $t = $tabs.children().filter(wanted).eq(0);
				if (! $t.length) {
					return;
				}

				var parent;
				if (parent = $t.closest('.js-tab').data('tab')) {
					parent.select();
				}
				$t.data('tab').select();
				$t.addClass(options.tab_content_class);
			}
		});
    };
})(jQuery);
