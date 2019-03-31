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

// globals
var creepLevel = 0;

// callback to populate powers for selected class 
function populatePowers(powerClass)
{
	$("#powers-wrapper").empty();
	
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
	var badge = $("<span>0</span>").attr("id", "power-badge-"+id).addClass("badge");
	
	subdiv.append($("<h6/>").addClass("power-name").append(description.name).append(badge).append($("<br/>")).append($("<small/>").append(formatPowerEffect(id, info, description.text))));
	
	// levels tag
	var levels = $("<div/>").addClass("levels").append(formatMultiValue(info.level));
	
	// buttons aligned to bottom
	var button = $("<button onclick=\"levelPower("+id+");\" />").addClass("button tiny").append("+");
	
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

// initialize stuff
$(document).foundation();
$(window).on('load', function()
{
	populatePowers("operator");
});