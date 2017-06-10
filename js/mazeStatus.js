define(['clone'], function(clone){
	
	function MazeStatus(options){
		
		var visitedSpaces = {};
		var path = {
			spaceIds: [],
			spaces: [],
			movements: []
		};
		var statusBasedEffects = [];
		var adiacents = options.adiacents;
		var redirect;
		var actualSpaceId = null;
		var teleports = {};
		var sack = [];
		var itemId = 0;
		var usedObjects = [];
		var eots = [];
		var keys = 0;
		var lifePoints = 1;
		var teleportEnabled = {};
		var bowTraps = {};
		var undoLevels = [];
		
		var spaceIds = options.spaceIds;
		for(var i=0; i<spaceIds.length; i++){
			visitedSpaces[spaceIds[i]] = false;
		}
		
		this.moveTo = function(spaceId, row, column, direction){
			path.spaceIds.push(spaceId);
			path.spaces.push([row, column]);
			visitedSpaces[spaceId] = true;
			actualSpaceId = spaceId;
			direction != null && path.movements.push(direction);
		};
		
		this.isDeadPath = function(){
			if(!actualSpaceId) return false;
			var isDeadPath = true;
			var actualSpaceAdiacents = adiacents[actualSpaceId];
			for(var i=0; isDeadPath && i<actualSpaceAdiacents.length; i++){
				if(actualSpaceAdiacents[i] !== 0 && visitedSpaces[actualSpaceAdiacents[i]] !== true) isDeadPath = false; 
			}
			return isDeadPath;
		};
		
		this.addStatusBasedEffect = function(effect){
			statusBasedEffects.push(effect);
		};
		
		this.getStatusBasedEffects = function(){
			return statusBasedEffects;
		};
		
		this.eraseStatusBasedEffect = function(){
			statusBasedEffect = [];
		};
		
		this.setRedirect = function(spaceId){
			redirect = spaceId;
		};
		
		this.getRedirect = function(){
			return redirect;
		};
		
		this.cancelRedirect = function(){
			redirect = null;
		};
		
		this.isVisited = function(spaceId){
			return visitedSpaces[spaceId] === true;
		}
		
		this.hasUnvisitedSpaces = function(){
			for(var spaceId in visitedSpaces){
				if(visitedSpaces[spaceId] === false) return true;
			}
			return false;
		};
		
		this.getActualSpaceId = function(){
			return actualSpaceId;
		};
		
		this.getPath = function(){
			return path;
		};
		
		this.isTeleportUsed = function(teleportId){
			return teleports[teleportId] === true;
		};
		
		this.setIsTeleportUsed = function(teleportId){
			teleports[teleportId] = true;
		};
		
		this.addEots = function(callback){
			eots.push(callback);
		}
		
		this.resolveEots = function(){
			for(var i=0; i<eots.length; i++){
				eots[i](this);
			}
			eots = [];
		};
		
		this.pushInSack = function(itemName){
			sack.push({
				name: itemName,
				id: itemId++
			});
		};
		
		this.getSack = function(){
			return sack;
		};
		
		this.emptySack = function(){
			sack = [];
		};
		
		this.setUsedObject = function(itemName){
			for(var i=0; i<sack.length; i++){
				var item = sack[i];
				if(item.name === itemName){
					usedObjects.push(item.id);
					return;
				}
			}
		};
		
		this.getUsedObjects = function(){
			return usedObjects;
		};
		
		this.cancelUsedObjects = function(){
			usedObjects = [];
		};
		
		this.addKey = function(){
			keys++;
		};
		
		this.removeKey = function(){
			keys--;
		};
		
		this.getKeys = function(){
			return keys;
		};
		
		this.addLifePoint = function(){
			lifePoints++;
		};
		
		this.removeLifePoint = function(){
			lifePoints--;
		};
		
		this.lifePoints = function(){
			return lifePoints;
		};
		
		this.hasTeleportBeenEnabled = function(teleportId){
			return teleportEnabled[teleportId] === true;
		};
		
		this.enableTeleport = function(teleportId){
			teleportEnabled[teleportId] = true;
		};
		
		this.isBowTrapUsed = function(bowTrapId){
			return bowTraps[bowTrapId] === true;
		};
		
		this.setBowTrapUsed = function(bowTrapId){
			bowTraps[bowTrapId] = true;
		};
		
		this.addUndoLevel = function(snapshot){
			undoLevels.push({
				snapshot: snapshot,
				status: {
					visitedSpaces: clone(visitedSpaces),
					path: clone(path),
					statusBasedEffects: clone(statusBasedEffects),
					adiacents: clone(adiacents),
					redirect: clone(redirect),
					actualSpaceId: clone(actualSpaceId),
					teleports: clone(teleports),
					sack: clone(sack),
					itemId: clone(itemId),
					usedObjects: clone(usedObjects),
					eots: clone(eots),
					keys: clone(keys),
					lifePoints: clone(lifePoints),
					teleportEnabled: clone(teleportEnabled),
					bowTraps: clone(bowTraps),
					spaceIds: clone(spaceIds)
				}
			});
		};
		
		this.popUndoLevel = function(){
			var undoLevel = undoLevels.pop();
			
			var snapshot = null;
			if(undoLevel){
				var status = undoLevel.status;
				var snapshot = undoLevel.snapshot;
				visitedSpaces = status.visitedSpaces;
				path = status.path;
				statusBasedEffects = status.statusBasedEffects;
				adiacents = status.adiacents;
				redirect = status.redirect;
				actualSpaceId = status.actualSpaceId;
				teleports = status.teleports;
				sack = status.sack;
				itemId = status.itemId;
				usedObjects = status.usedObjects;
				eots = status.eots;
				keys = status.keys;
				lifePoints = status.lifePoints;
				teleportEnabled = status.teleportEnabled;
				bowTraps = status.bowTraps;
				spaceIds = status.spaceIds;			
			}
			
			return {
				level: snapshot,
				isLast: undoLevels.length === 0
			};
		};
		
		this.hasUndo = function(){
			return undoLevels.length > 0;
		}
		
	};
	
	return MazeStatus;
	
});