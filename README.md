# jQuery Tabify plugin

This turns all divs with the class `js-tab` into tabs, by taking either an
element labelled `js-title` or the first header from each div and turning it
into the tab, and leaving the rest in situ as the tab content.


    <div class="js-tabs">
		<div class="js-tab">
			<h1 class="js-title">Tab 1</h1>

			<p>Tab 1 awesomesauce content</p>
		</div>
		<div class="js-tab">
			<h1 class="js-title">Tab 2</h1>

			<p>Tab 2 awesomesauce content</p>
		</div>
	</div>

	$('.js-tabs').tabify();
