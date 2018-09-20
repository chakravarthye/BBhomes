(function () {
    window.game = window.game || {};

    var ImageButton = function(imageName){
        this.Container_constructor();
        this.initialize(imageName);
        this.setupEvents();
    }

    var p = createjs.extend(ImageButton,createjs.Container);

    p.button_basic_img = null;
    p.button_hover_img = null;
    p.tgtObject = null;
    p.tgtCmd = "";

    p.initialize = function(inputName){
      this.button_basic_img = new createjs.Bitmap(assets.getAsset1(inputName));
      this.button_hover_img = new createjs.Bitmap(assets.getAsset1(inputName+"_hover"));
      this.button_hover_img.alpha = 0;
      this.addChild(this.button_basic_img, this.button_hover_img);
    }

    p.setupEvents = function(){
        this.on("mouseover", this.handleMouseover, this);
        this.on("mouseout", this.handleMouseout, this);
        this.on("mousedown", this.handleMousedown, this);
        this.on("pressup", this.handlePressup , this);
    }

    p.handleMouseover = function(){
        this.button_hover_img.alpha = 1.0; this.button_basic_img.alpha = 0.0;
        this.button_hover_img.scaleX = this.button_hover_img.scaleY = 1.0;
    }

    p.handleMouseout = function(){
        this.button_hover_img.alpha = 0; this.button_basic_img.alpha = 1.0;
        this.button_basic_img.scaleX = this.button_basic_img.scaleY = 1.0;
        this.button_hover_img.scaleX = this.button_hover_img.scaleY = 1.0;
    }

    p.handleMousedown = function(){
        this.tgtObject[this.tgtCmd]();
        this.button_hover_img.scaleX = this.button_hover_img.scaleY = 0.95;
    }

    p.handlePressup = function(){
        this.button_hover_img.scaleX = this.button_hover_img.scaleY = 1.0;
    }

    p.updateTgt = function(target,cmd){
        this.tgtObject = target;
        this.tgtCmd = cmd;
    }

    window.game.ImageButton = createjs.promote(ImageButton,"Container");

}());
