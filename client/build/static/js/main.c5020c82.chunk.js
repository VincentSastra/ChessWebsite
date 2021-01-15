(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{39:function(e,t,i){},40:function(e,t,i){},46:function(e,t,i){},48:function(e,t,i){"use strict";i.r(t);var n=i(2),o=i(0),s=i.n(o),r=i(14),a=i.n(r),c=(i(39),i(17)),l=i(7),h=i(15),u=i(16),d=i(19),p=i(32),g=i(31),f=(i(40),i(50)),v=i(51),k=i(55),m=i(56),j=i(54),b=i(53),y=i(52),w=i(28),C=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P(),i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"KQkq",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";Object(h.a)(this,e),this.Tiles=O(t),this.Castle=i,this.Winner="none",this.Passant=n}return Object(u.a)(e,[{key:"getTiles",value:function(){return this.Tiles}},{key:"getTile",value:function(e,t){return this.Tiles[e][t]}},{key:"getWinner",value:function(){return this.Winner}},{key:"getPiece",value:function(e,t){return this.Tiles[e][t].getPiece()}},{key:"movePiece",value:function(e,t,i,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"Queen",s=this.Tiles[e][t],r=this.Tiles[i][n],a=r.getPiece();switch("King"===a&&(this.Winner="white"===r.getColor()?"Black":"White"),r.piece=s.piece,s.getPiece()){case"Pawn":this.validPassant(s,r)&&(a="Pawn",this.Tiles[i][t].piece="empty"),this.handlePromotion(s,r,o);break;case"King":this.handleCastle(s,r),this.disableCastle(s);break;case"Rook":this.disableCastle(s)}return this.setPassant(s,r),s.piece="empty",a}},{key:"validPassant",value:function(e,t){return"Pawn"===e.getPiece()&&""+t.row+t.col===this.Passant}},{key:"setPassant",value:function(e,t){if("Pawn"===e.getPiece()&&2===Math.abs(t.row-e.row)){var i="white"===e.getColor()?1:-1;this.Passant=""+(e.row+i)+e.col}else this.Passant=""}},{key:"handlePromotion",value:function(e,t,i){0!==t.row&&7!==t.row||(t.piece=e.getColor()+i)}},{key:"handleCastle",value:function(e,t){Math.abs(t.col-e.col)>1&&(2===t.col?this.movePiece(e.row,0,e.row,3):6===t.col&&this.movePiece(e.row,7,e.row,5))}},{key:"disableCastle",value:function(e){var t="King"===e.getPiece()?"KQ":0===e.col?"Q":"K";"black"===e.getColor()&&(t=t.toLowerCase());var i=new RegExp(t,"");this.Castle=this.Castle.replace(i,"")}},{key:"getValidTiles",value:function(e,t){var i=this.Tiles[e][t],n=i.getColor(),o=[];switch(i.getPiece()){case"Rook":this.getValidRookTiles(t,e,n,o);break;case"Knight":this.getValidKnightTiles(t,e,n,o);break;case"Bishop":this.getValidBishopTiles(t,e,n,o);break;case"King":this.getValidKingTiles(t,e,n,o);break;case"Queen":this.getValidBishopTiles(t,e,n,o),this.getValidRookTiles(t,e,n,o);break;case"Pawn":this.getValidPawnTiles(t,e,n,o)}return o}},{key:"getValidKnightTiles",value:function(e,t,i,n){for(var o=1;o<3;o++){var s=3-o;this.pushToValid(t+o,e+s,i,n),this.pushToValid(t+o,e-s,i,n),this.pushToValid(t-o,e-s,i,n),this.pushToValid(t-o,e+s,i,n)}}},{key:"getValidRookTiles",value:function(e,t,i,n){for(var o=[-1,0,0,1],s=[0,-1,1,0],r=0;r<4;r++)for(var a=o[r]+t,c=s[r]+e;this.pushToValid(a,c,i,n);)a+=o[r],c+=s[r]}},{key:"getValidBishopTiles",value:function(e,t,i,n){for(var o=0;o<5;o++)for(var s=o<1.5?1:-1,r=e+s,a=o%2?1:-1,c=t+a;this.pushToValid(c,r,i,n);)r+=s,c+=a}},{key:"getValidKingTiles",value:function(e,t,i,n){for(var o=-1;o<2;o++)for(var s=-1;s<2;s++)this.pushToValid(t+o,e+s,i,n);var r="white"===i?0:7;("white"===i&&this.Castle.includes("K")||"black"===i&&this.Castle.includes("k"))&&"empty"===this.Tiles[r][6].getColor()&&"empty"===this.Tiles[r][5].getColor()&&n.push(this.Tiles[r][6]),("white"===i&&this.Castle.includes("Q")||"black"===i&&this.Castle.includes("q"))&&"empty"===this.Tiles[r][1].getColor()&&"empty"===this.Tiles[r][2].getColor()&&"empty"===this.Tiles[r][3].getColor()&&n.push(this.Tiles[r][2])}},{key:"getValidPawnTiles",value:function(e,t,i,n){for(var o=1===t||6===t?3:2,s="white"===i?1:-1,r=1;r<o;r++){var a=t+r*s;if(a>7||a<0)break;if("empty"!==this.Tiles[a][e].piece)break;this.pushToValid(t+r*s,e,i,n)}this.pushToValidPawn(t+s,e+1,i,n),this.pushToValidPawn(t+s,e-1,i,n)}},{key:"pushToValid",value:function(e,t,i,n){if(e>7||e<0||t>7||t<0)return!1;var o=this.Tiles[e][t];return"empty"===o.getColor()?(n.push(o),!0):(o.getColor()!==i&&n.push(o),!1)}},{key:"pushToValidPawn",value:function(e,t,i,n){if(e>-1&&e<8&&t>-1&&t<8){var o=this.Tiles[e][t];(""+o.row+o.col===this.Passant||"empty"!==o.getColor()&&o.getColor()!==i||""+o.row+o.col===this.Passant)&&n.push(o)}}},{key:"clone",value:function(){return new e(this.Tiles.map((function(e){return e.map((function(e){return e.piece}))})),this.Castle,this.Passant)}}]),e}();function O(e){for(var t=[],i=0;i<8;i++){for(var n=[],o=0;o<8;o++)n.push(new x(i,o,e[i][o]));t.push(n)}return t}function P(){for(var e=[],t=0;t<8;t++){for(var i=[],n=0;n<8;n++)i.push(T(t,n));e.push(i)}return e}function T(e,t){if(e<1)switch(Math.abs(7-2*t)){case 7:return"whiteRook";case 5:return"whiteKnight";case 3:return"whiteBishop";case 1:return 4===t?"whiteKing":"whiteQueen";default:return"empty"}else{if(e<2)return"whitePawn";if(e<6)return"empty";if(e<7)return"blackPawn";if(e<8)switch(Math.abs(7-2*t)){case 7:return"blackRook";case 5:return"blackKnight";case 3:return"blackBishop";case 1:return 4===t?"blackKing":"blackQueen";default:return"empty"}}}var x=function(){function e(t,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.generatePiece(t,i);Object(h.a)(this,e),this.row=t,this.col=i,this.piece=n}return Object(u.a)(e,[{key:"getColor",value:function(){return this.piece.substr(0,5)}},{key:"getPiece",value:function(){return this.piece.substr(5)}},{key:"clone",value:function(){return new e(this.row,this.col,this.piece)}}]),e}(),B={Queen:90,King:2e3,Rook:50,Knight:30,Bishop:30,Pawn:10,"":0};function V(e,t,i){if(0===i){return{futureMove:"",futureValue:0}}var n="white"===t?"black":"white";i=Math.min(i,5);for(var o="",s="nodef",r=function(r){for(var a=function(a){e.Tiles[r][a].piece.substr(0,5)===t&&e.getValidTiles(r,a).forEach((function(c){var l=e.clone(),h=B[l.movePiece(r,a,c.row,c.col)],u=V(l,n,i-1),d=u.futureMove,p=u.futureValue;"white"===t?("nodef"===s||h+p>s)&&(s=p+h,o=""+r+a+c.row+c.col+d):("nodef"===s||-h+p<s)&&(s=p-h,o=""+r+a+c.row+c.col+d)}))},c=0;c<8;c++)a(c)},a=0;a<8;a++)r(a);return{futureMove:o,futureValue:s}}function M(){var e=Object(w.a)([""]);return M=function(){return e},e}var K=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.afterVictoryCallback,n=void 0===i?function(){}:i,o=t.computerOption,s=void 0===o?"local":o,r=t.playerColor,a=void 0===r?"white":r;Object(h.a)(this,e),this.getComputerMove=V,this.ChessLogic=new C,this.Blocks=this.generateBlocks(),this.turn="white",this.emptyBlock="empty",this.selectedBlock=this.emptyBlock,this.computerOption=s,this.playerColor=a,this.moveList=[],this.aftermatch=!1,this.showVictoryScreen=n}return Object(u.a)(e,[{key:"handleClick",value:function(e){this.turn!==this.playerColor&&"computer"===this.computerOption||("empty"===this.selectedBlock||"empty"===this.selectedBlock.getPiece()?this.turn===e.getColor()&&(this.highlight(e),this.selectedBlock=e):this.movePiece(e)&&(this.turn="white"===this.turn?"black":"white",this.recordMove(e.getPiece().substr(5),e.row,e.col),this.checkWinner()))}},{key:"handleComputerTurn",value:function(){if(this.turn!==this.playerColor&&"computer"===this.computerOption){var e=V(this.ChessLogic,this.turn,3).futureMove.split(M()).map((function(e){return+e}));this.recordMove(this.ChessLogic.getPiece(e[0],e[1]),e[2],e[3]),this.ChessLogic.movePiece(e[0],e[1],e[2],e[3]),this.turn="white"===this.turn?"black":"white",this.checkWinner()}}},{key:"recordMove",value:function(e,t,i){this.moveList.push(this.moveList.length+1+". \t"+e+" move to "+String.fromCharCode(i+65)+(t+1))}},{key:"checkWinner",value:function(){"none"===this.ChessLogic.getWinner()||this.aftermatch||(this.aftermatch=!0,this.showVictoryScreen(this.ChessLogic.getWinner()))}},{key:"movePiece",value:function(e){var t=!1;return"HighlightBlock"===e.type&&(this.ChessLogic.movePiece(this.selectedBlock.row,this.selectedBlock.col,e.row,e.col),t=!0),this.selectedBlock=this.emptyBlock,this.unhighlight(),t}},{key:"highlight",value:function(e){var t=this;this.ChessLogic.getValidTiles(e.row,e.col).forEach((function(e){return t.getBlock(e).highlight()}))}},{key:"unhighlight",value:function(){this.Blocks.forEach((function(e){return e.forEach((function(e){return e.unhighlight()}))}))}},{key:"generateBlocks",value:function(){for(var e=[],t=0;t<8;t++){for(var i=[],n=0;n<8;n++)i.push(new L(t,n,this.ChessLogic.getTile(t,n)));e.push(i)}return e}},{key:"getBlock",value:function(e){return this.Blocks[e.row][e.col]}}]),e}(),L=function(){function e(t,i,n){Object(h.a)(this,e),this.row=t,this.col=i,this.tile=n,this.unhighlight()}return Object(u.a)(e,[{key:"highlight",value:function(){this.type="HighlightBlock"}},{key:"unhighlight",value:function(){this.type=(this.row+this.col)%2?"LightBlock":"DarkBlock"}},{key:"getColor",value:function(){return this.tile.getColor()}},{key:"getPiece",value:function(){return this.tile.getColor()+this.tile.getPiece()}}]),e}(),N=K,W=function(e){Object(p.a)(i,e);var t=Object(g.a)(i);function i(e){var n;return Object(h.a)(this,i),n=t.call(this,e),console.log(e.location.state),void 0===e.location.state&&(e.location.state={computerOption:"local",playerColor:"white"}),n.showVictoryScreen=function(e){n.setState({modalShow:!0,winner:e})},n.ChessController=new N({afterVictoryCallback:n.showVictoryScreen,computerOption:e.location.state.computerOption,playerColor:e.location.state.playerColor}),n.state={Blocks:n.ChessController.Blocks,winner:"White",modalShow:!1,closeModal:function(){return n.setState({modalShow:!1})}},n.handleClick=n.handleClick.bind(Object(d.a)(n)),n}return Object(u.a)(i,[{key:"handleClick",value:function(e){var t=this;this.ChessController.handleClick(e),this.forceUpdate(),setTimeout((function(){t.ChessController.handleComputerTurn(),t.forceUpdate()}),1)}},{key:"getImagePath",value:function(e){return"".concat("/pieceImages/",e,".png")}},{key:"renderBoard",value:function(){var e=this,t=this.state.Blocks.slice(0).reverse().map((function(t){var i=t.map((function(t){return Object(n.jsx)(f.a,{onClick:e.handleClick.bind(e,t),id:t.type,children:"empty"===t.getPiece()?null:Object(n.jsx)("img",{src:e.getImagePath(t.getPiece()),id:t.type+"Piece",alt:t.getPiece()})},t.col+8*t.row)}));return Object(n.jsx)(v.a,{children:i},i[0].key/8)}));return Object(n.jsx)("div",{className:"Square",children:t})}},{key:"renderMenu",value:function(){return Object(n.jsxs)(k.a,{className:"SideMenu",children:[Object(n.jsx)(c.b,{to:"/",children:Object(n.jsx)(m.a,{block:!0,children:"Return to Main Menu"})}),Object(n.jsx)(j.a,{variant:"flush",className:"MoveList",children:this.ChessController.moveList.map((function(e){return Object(n.jsx)(j.a.Item,{id:"MoveItem",children:e})}))})]})}},{key:"renderVictoryModal",value:function(){return Object(n.jsxs)(b.a,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:this.state.modalShow,onHide:function(){},children:[Object(n.jsxs)(b.a.Body,{children:[Object(n.jsxs)("h4",{children:[this.state.winner," Wins!"]}),Object(n.jsx)("p",{children:"Return to the main menu for a new game."})]}),Object(n.jsx)(b.a.Footer,{children:Object(n.jsx)(m.a,{onClick:this.state.closeModal,children:"Close"})})]})}},{key:"render",value:function(){var e=this.renderBoard(),t=this.renderMenu(),i=this.renderVictoryModal();return Object(n.jsxs)(y.a,{className:"Centered",children:[i,e,t]})}}]),i}(o.Component);i(46);function S(e){return Object(n.jsx)(f.a,{className:"MenuCard",children:Object(n.jsx)(c.b,{to:{pathname:"/play",state:{option:e.option}},style:{textDecoration:"inherit",color:"inherit"},children:Object(n.jsxs)(k.a,{component:!0,children:[Object(n.jsx)(k.a.Img,{variant:"top",src:e.img}),Object(n.jsx)(k.a.Body,{children:Object(n.jsx)(k.a.Title,{children:e.title})})]})})})}function R(e){return Object(n.jsxs)(f.a,{className:"MenuCard",children:[Object(n.jsxs)(k.a,{children:[Object(n.jsx)(k.a.Img,{variant:"top",src:e.img}),Object(n.jsx)(k.a.Body,{children:Object(n.jsx)(k.a.Title,{children:e.title})})]}),Object(n.jsx)("div",{className:"Underneath",children:Object(n.jsxs)(v.a,{className:"Row",children:[Object(n.jsx)(c.b,{className:"Link",to:{pathname:"/play",state:{computerOption:e.computerOption,playerColor:"white"}},style:{textDecoration:"inherit",color:"inherit"},children:Object(n.jsxs)(k.a,{className:"Choice",children:[Object(n.jsx)(k.a.Img,{variant:"top",src:"menu/white.jpg"}),Object(n.jsx)(k.a.Body,{children:Object(n.jsx)(k.a.Title,{children:"Play as White"})})]})}),Object(n.jsx)(c.b,{className:"Link",to:{pathname:"/play",state:{computerOption:e.computerOption,playerColor:"black"}},style:{textDecoration:"inherit",color:"inherit"},children:Object(n.jsxs)(k.a,{className:"Choice",children:[Object(n.jsx)(k.a.Img,{variant:"top",src:"menu/black.jpg"}),Object(n.jsx)(k.a.Body,{children:Object(n.jsx)(k.a.Title,{children:"Play as Black"})})]})})]})})]})}var I=function(){return Object(n.jsxs)(v.a,{className:"Centered",children:[Object(n.jsx)(S,{option:"local",img:"menu/local.jpg",title:"Local Multiplayer"}),Object(n.jsx)(R,{computerOption:"computer",img:"menu/computer.jpg",title:"Versus Computer"})]})};i(47);var Q=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)("header",{className:"App-header",children:Object(n.jsx)(c.a,{children:Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{path:"/",exact:!0,component:I}),Object(n.jsx)(l.a,{path:"/play",exact:!0,component:W})]})})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(Q,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[48,1,2]]]);
//# sourceMappingURL=main.c5020c82.chunk.js.map