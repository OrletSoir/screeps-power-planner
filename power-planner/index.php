<?php

/**
 * @author Orlet Soir
 * @copyright 2019
 * 
 * Screeps Power Planner for Power Creeps
 */

define('VERSION_STRING', "v0.1")

?>
<!doctype html>
<html class="no-js" lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Screeps Power Planner</title>
		<link rel="stylesheet" href="css/foundation.css">
		<link rel="stylesheet" href="css/app.css">
	</head>
	<body>
		&nbsp;
		<div class="grid-container">
			<!-- page header -->
			<div class="grid-x grid-padding-x">
				<div class="large-24 cell text-center">
					<div class="callout">
						<h4>Screeps Power Planner <small><?php echo VERSION_STRING; ?></small></h4>
					</div>
				</div>
			</div>
			<!-- main body container -->
			<div class="grid-x grid-padding-x" id="duo-pane-eq" data-equalizer="foo">
				<div id="powers-available-container" class="large-18 cell">
					<div class="callout" data-equalizer-watch="foo">
						<label>Class:</label>
						<select id="class" required onchange="onClassChange();" disabled="DISABLED">
    						<option disabled="DISABLED" selected="SELECTED" value="operator" class="disabled-option">Operator</option>
						</select>
						<div class="grid-x grid-padding-x" id="powers-wrapper" data-equalizer="bar" data-equalize-by-row="true">
							&nbsp;
						</div>
					</div>
				</div>
				<div id="powers-selected-container" class="large-6 cell text-center">
					<div class="callout" data-equalizer-watch="foo">
						<h6 class="power-creep-info">
							Lv.: <small id="display-level">0</small> / Hits: <small id="display-hits">1000</small> / Carry: <small id="display-carry">100</small>
						</h6>
						<hr />
						<h6><u>Selected Powers</u></h6>
						<div id="powers-selected-list"></div>
						<hr />
						<h6 data-toggle="powers-copy-list"><u>Pick Order</u></h6>
						<div id="powers-copy-list" class="dropdown-pane" data-dropdown data-position="bottom" data-alignment="center" data-auto-focus="true">
							<textarea id="powers-copy-area" onfocus="this.select();" rows="4">[]</textarea>
						</div>
						<div id="powers-history-list"></div>
					</div>
				</div>
			</div>
			<!-- page footer -->
			<div class="grid-x grid-padding-x">
				<div class="large-24 cell text-center">
					<div class="callout page-footer text-center">
						&lt;insert footer here&gt;
					</div>
				</div>
			</div>
		</div>
		
		<script src="js/vendor/jquery.js"></script>
		<script src="js/vendor/what-input.js"></script>
		<script src="js/vendor/foundation.js"></script>
		<script src="js/constants.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
