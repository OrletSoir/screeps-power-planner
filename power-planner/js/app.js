// formatting function, stolen from stackexchange
String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

// sub-element sorting function
function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
};

function sortReverseUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? 1 : (vA > vB) ? -1 : 0;
    });
    parent.append(items);
};

// globals
var creepClass = "";
var creepLevel = 0;
var powerHistory = [];

// callback to populate powers for selected class 
function populatePowers(powerClass)
{
	$("#powers-wrapper").empty();
	$("#powers-selected-list").empty();
	$("#powers-history-list").empty();
	
	// save values
	creepClass = powerClass;
	creepLevel = 0;
	
	// re-populate powers
	for (var power in POWER_INFO)
	{
		if (!POWER_INFO[power] || !POWER_INFO[power].className || POWER_INFO[power].className != powerClass)
			continue;
		
		addPower(power, POWER_INFO[power], POWER_DESCRIPTIONS[power]);
	}
	
	// reflow the new stuff
	Foundation.reInit('equalizer');	
	$(document).foundation();	
}

// return either value or glued value if it's an array
function formatMultiValue(value)
{
	if (!value.length || !value.join)
		return value;
	
	return value.join("/");
}

// format power description text
function formatPowerEffect(id, info, description)
{
	// h4x
	id = parseInt(id);
	var mag = ["", "K", "M", "B", "T"];
	
	switch (id)
	{
		// handle special cases
		case PWR_OPERATE_SPAWN:
		case PWR_OPERATE_TERMINAL:
		case PWR_DISRUPT_TOWER:
			var effect = [];
			for (var i = 0; i < info.effect.length; i++)
				effect.push(Math.round((1 - info.effect[i])*100)+"%");
				
			return description.formatUnicorn(formatMultiValue(effect));
		
		case PWR_OPERATE_TOWER:
			var effect = [];
			for (var i = 0; i < info.effect.length; i++)
				effect.push(Math.round((info.effect[i] - 1)*100)+"%");
				
			return description.formatUnicorn(formatMultiValue(effect));
		
		case PWR_OPERATE_EXTENSION:
			var effect = [];
			for (var i = 0; i < info.effect.length; i++)
				effect.push(Math.round((info.effect[i])*100)+"%");
				
			return description.formatUnicorn(formatMultiValue(effect));
		
		case PWR_SHIELD:
		case PWR_OPERATE_STORAGE:
			var effect = [];
			for (var i = 0; i < info.effect.length; i++)
			{
				var value = info.effect[i];
				var order = 0;
				
				while (value > 1000)
				{
					value = value/1000;
					order++;
				}
				
				effect.push(value+mag[order]);
			}
				
			return description.formatUnicorn(formatMultiValue(effect));
		
		// default formatting shold work for most powers
		default:
			return description.formatUnicorn(info.effect && formatMultiValue(info.effect));
	}
}

// format powers' description (return inner element)
function generateTooltipText(info)
{
	var lines = [];
	
	if (info.ops)
		lines.push("Cost: "+formatMultiValue(info.ops)+" ops");
	
	if (info.range)
		lines.push("Range: "+formatMultiValue(info.range));
	
	if (info.duration)
		lines.push("Duration: "+formatMultiValue(info.duration));
	
	if (info.cooldown)
		lines.push("Cooldown: "+formatMultiValue(info.cooldown));
	
	return $("<p/>").addClass("text-left").append(lines.join("<br/>"));
}

// add the power to powers panel
function addPower(id, info, description)
{
	// main element wrappers
	var div = $("<div/>").addClass("small-12 medium-8 large-8 cell text-center power-container");
	var subdiv = $("<div/>").addClass("callout small").attr("data-equalizer-watch", "bar").attr("data-toggle", "power-info-"+id);
	
	// name and description
	var badge = $("<span>0</span>").attr("id", "power-badge-"+id).addClass("badge secondary float-right");
	
	subdiv.append($("<h6/>").addClass("power-name").append(description.name).append(badge).append($("<br/>")).append($("<small/>").append(formatPowerEffect(id, info, description.text))));
	
	// levels tag
	var levels = $("<div/>").addClass("levels").append(formatMultiValue(info.level));
	
	// buttons aligned to bottom
	var button = $("<button onclick=\"levelPower("+id+");\" />").addClass("button tiny float-right").attr("id", "power-button-"+id).append("+");
	
	if (creepLevel >= POWER_CREEP_MAX_LEVEL)
		button.addClass("secondary disabled");
	else if (info.level[0] > creepLevel)
		button.addClass("alert disabled");
	else
		button.addClass("success");
	
	subdiv.append($("<div/>").addClass("button-spacer").append("&nbsp;"));
	subdiv.append($("<div/>").addClass("button-container align-to-bottom power-level-add").append(levels).append(button));
	
	div.append(subdiv);
	
	// pop-out detailed info panel
	div.append($("<div/>").addClass("dropdown-pane").attr("id", "power-info-"+id).attr("data-position", "bottom").attr("data-alignment", "center").attr("data-dropdown", "").attr("data-hover", "true").attr("data-hover-pane", "true").append(generateTooltipText(info)));
	
	// put the whole thing in
	$("#powers-wrapper").append(div);
}

// level the power up and update all the things
function levelPower(id)
{
	var powerBlock = $("#power-info-"+id);
	if (!powerBlock.length)
		return;
	
	var powerBadge = $("#power-badge-"+id);
	if (!powerBadge.length)
		return;
	
	var powerInfo = POWER_INFO[id];
	if (!powerInfo)
		return;
	
	// level checks
	var currentLevel = parseInt(powerBadge.text());
	var nextLevel = currentLevel+1;
	
	if (currentLevel > powerInfo.level.length || powerInfo.level[currentLevel] > creepLevel)
		return;
	
	// update the badge
	updatePowerBadge(powerBadge, nextLevel, powerInfo.level.length);
	
	// save to history
	powerHistory.push(id);
	
	// update the internal counters and power button availability
	creepLevel++;
	updateCreepStats();
	updatePowerUpgradeButtons();
	
	// add power to sidebar and update the overall list
	addUpdatePowerToSidebarList(id, nextLevel);
	addPowerToSidebarHistory(id, nextLevel);
	updatePowersCopyArea();
	updateUndoButton();
}

// add selected power to the sidebar
function addPowerToSidebarHistory(id, level)
{
	var powerSidebar = $("#powers-history-list");
	if (!powerSidebar.length)
		return;
	
	var desc = POWER_DESCRIPTIONS[id];
	if (!desc)
		return;
	
	powerSidebar.append($("<h6/>").addClass("power-item").attr("id", "powers-history-item-"+creepLevel).append(desc.name).append(" ").append($("<small/>").append("Lv. "+level)));
}

// remove selected power from the sidebar
function removePowerFromSidebarHistory(level)
{
	var powerItem = $("#powers-history-item-"+level);
	if (!powerItem.length)
		return;
	
	powerItem.remove();
}

function addUpdatePowerToSidebarList(id, level)
{
	var powerSelectedList = $("#powers-selected-list");
	if (!powerSelectedList.length)
		return;
	
	var desc = POWER_DESCRIPTIONS[id];
	if (!desc)
		return;
	
	var powersItem = $("#powers-selected-item-"+id);
	if (powersItem.length)
	{
		if (level > 0)
		{
			var powersItemLevel = $("small", powersItem);
			
			powersItemLevel.empty();
			powersItemLevel.append("Lv. "+level);
		}
		else
			powersItem.remove();
	}
	else
		powerSelectedList.append($("<h6/>").addClass("power-item").attr("id", "powers-selected-item-"+id).append(desc.name).append(" ").append($("<small/>").append("Lv. "+level)));
	
	sortReverseUsingNestedText(powerSelectedList, "h6", "small");
}

function updatePowersCopyArea()
{
	$("#powers-copy-area").val(JSON.stringify(powerHistory));
}

function addMoveUndoButton()
{
	var button = $("#power-undo-button");
	
	if (button.length < 1)
		button = $("<div/>").attr("id", "power-undo-button").append("&nbsp;").append($("<button onclick=\"undoLevelPower();\" />").addClass("button tiny float-right").append("&#x293E;"));
	
	$("#powers-history-list").append(button);
}

function updateUndoButton()
{
	var button = $("#power-undo-static");
	
	if (button.length < 1)
		return;
	
	button.removeClass("disabled");
	
	if (creepLevel < 1)
		button.addClass("disabled");
}

function removeUndoButton()
{
	var button = $("#power-undo-button");
	
	if (button.length)
		button.remove();
}

function undoLevelPower()
{
	// what's on history
	var lastPower = powerHistory.pop();
	
	var powerBadge = $("#power-badge-"+lastPower);
	if (!powerBadge.length)
		return;
	
	var powerInfo = POWER_INFO[lastPower];
	if (!powerInfo)
		return;
	
	// level checks
	var currentLevel = parseInt(powerBadge.text());
	var nextLevel = currentLevel-1;
	
	// update the badge
	updatePowerBadge(powerBadge, nextLevel, powerInfo.level.length);
	
	// remove power from sidebar and update overall list
	removePowerFromSidebarHistory(creepLevel);
	addUpdatePowerToSidebarList(lastPower, nextLevel);
	
	// update the internal counters and power button availability
	creepLevel--;
	updateCreepStats();
	updatePowerUpgradeButtons();
	
	// add power to sidebar and update the overall list
	updatePowersCopyArea();
	updateUndoButton();
}

// update the badges for creep level and stats
function updateCreepStats()
{
	var levelDisplay = $("#display-level");
	if (!levelDisplay)
		return;
	
	var hitsDisplay = $("#display-hits");
	if (!hitsDisplay)
		return;
	
	var carryDisplay = $("#display-carry");
	if (!carryDisplay)
		return;
	
	levelDisplay.empty();
	levelDisplay.append(creepLevel);
	
	hitsDisplay.empty();
	hitsDisplay.append((creepLevel+1)*1000);
	
	carryDisplay.empty();
	carryDisplay.append((creepLevel+1)*100);
	
}

// update the power upgrade buttons
function updatePowerUpgradeButtons()
{
	for (var power in POWER_INFO)
	{
		if (!POWER_INFO[power] || !POWER_INFO[power].className || POWER_INFO[power].className != creepClass)
			continue;
		
		enableDisableUpgradeButton(power, POWER_INFO[power]);
	}
}

// update the power badge
function updatePowerBadge(powerBadge, nextLevel, maxLevel)
{
	powerBadge.empty();
	powerBadge.append(nextLevel);
	powerBadge.removeClass("success warning secondary");
	
	if (nextLevel < 1)
		powerBadge.addClass("secondary");
	else if (nextLevel >= maxLevel)
		powerBadge.addClass("warning");
	else
		powerBadge.addClass("success");
}

// enable/disable the power upgrade button for power id
function enableDisableUpgradeButton(id, info)
{
	var powerButton = $("#power-button-"+id);
	if (!powerButton.length)
		return;
	
	var powerBadge = $("#power-badge-"+id);
	if (!powerBadge.length)
		return;
	
	var nextLevel = parseInt(powerBadge.text());
	
	powerButton.removeClass("success alert secondary disabled");
	
	if (creepLevel >= POWER_CREEP_MAX_LEVEL || nextLevel >= info.level.length)
		powerButton.addClass("secondary disabled");
	else if (info.level[nextLevel] > creepLevel)
		powerButton.addClass("alert disabled");
	else
		powerButton.addClass("success");
}

// reset all current selection data
function resetPowerProgress()
{
	// reset creep's levels
	creepLevel = 0;
	powerHistory.length = 0;
	
	$("#powers-history-list").empty();
	$("#powers-selected-list").empty();
	
	// re-populate powers
	for (var power in POWER_INFO)
	{
		if (!POWER_INFO[power] || !POWER_INFO[power].className || POWER_INFO[power].className != creepClass)
			continue;
	
		var powerBadge = $("#power-badge-"+power);
		if (!powerBadge.length)
			continue;
		
		// update the badge
		updatePowerBadge(powerBadge, 0, POWER_INFO[power].level.length);
		enableDisableUpgradeButton(power, POWER_INFO[power]);
	}
	
	updateCreepStats();
	updatePowersCopyArea();
	updateUndoButton();
}

// process specific power
function processPowerUpgrade(power)
{
	levelPower(power);
}

// process power upgrade path
function processPowersUpgradeArray(powers)
{
	// reset all data
	resetPowerProgress();
	
	// process powers
	for (var i = 0; i < powers.length; i++)
		processPowerUpgrade(powers[i]);
}

// pick order field changed
function pickOrderUpdate()
{
	var powerArea = $("#powers-copy-area");
	if (!powerArea.length)
		return;
	
	var powers = JSON.parse(powerArea.val());
	
	if (powers)
		processPowersUpgradeArray(powers);
}

// set up powers from saved parameter
function processPowersParameter(parameter)
{
	var powers = parameter.split && parameter.split(",");
	
	if (!powers || !powers.length)
		return;
	
	for (var i = 0; i < powers.length; i++)
		processPowerUpgrade(parseInt(powers[i]));
}

// generate share link
function updateShareLink()
{
	window.history.replaceState(powerHistory, 'Powers Share', '?p='+powerHistory);
}

// initialize stuff
$(document).foundation();
$(window).on('load', function()
{
	populatePowers("operator");
	
	if (powersParam && powersParam.length)
		processPowersParameter(powersParam);
});