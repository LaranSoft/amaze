define(function(){

	var levelList = [];
	
	levelList.push('level0'); 	// tutorial
	levelList.push('level1'); 	// livello che è stato tutorial per molto tempo
	levelList.push('level2');   // ultimo livello senza gadget 
	levelList.push('level3');   // force direction semplicino ma un minimo piu' complesso
	levelList.push('level4');   // force direction ancora un po' più complesso
	levelList.push('level5'); 	// force direction più complesso che abbia fatto 
	levelList.push('level6'); 	// 3x3 col teleport
	levelList.push('level7'); 	// 4x4 con force direction
	levelList.push('level8'); 	// primo livello con chiave
	levelList.push('level9'); 	// secondo livello con chiave
	levelList.push('level10');  // cuori e trappole che ha bloccato Alessio per tempo
	levelList.push('level11'); 	// 4x4 col teleport + switch
	levelList.push('level12');  // livello 3x3 con tutte le caselle piene
	levelList.push('level13');  // livello grosso con archi e teleport
	levelList.push('level14');  // force direction + trappola
	levelList.push('level15');  // livello disegnato da Alex
	levelList.push('level16');  // livello con cui ho ripreso
	levelList.push('level17');  // primo livello gemello 
	levelList.push('level18');  // secondo livello gemello
	levelList.push('level19');  // primo livello con ostacolo
	levelList.push('level20');  // livello enorme con teleports e due ostacoli
	levelList.push('level21');  // secondo livello disegnato da Alessio
	levelList.push('level22');  // 3 x 3 con coppia di teleport
	levelList.push('level23');  // livello a scala
	levelList.push('level24');  // livello abbastanza anonimo ma carino
	levelList.push('level25');  // livello abbastanza anonimo ma carino
	levelList.push('level26');  // livello abbastanza anonimo ma carino
	levelList.push('level27');  // livello abbastanza anonimo ma carino
	levelList.push('level28');  // livello abbastanza anonimo ma carino
	levelList.push('level29');  // livello abbastanza anonimo ma carino
	
	
	return {
		getStageCount: function(){
			return levelList.length;
		},
		getLevel: function(index){
			return levelList[index-1];
		}
	}
});

