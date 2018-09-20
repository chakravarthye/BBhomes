(function () {
    window.game = window.game || {};

    var AssetManager = function(){
        this.EventDispatcher_constructor();
        this.initialize();
    }

    var p = createjs.extend(AssetManager,createjs.EventDispatcher);

    p.queue1 =null;
    p.progress = 0;
    p.loadManifest1 = [
        {id: "site_plan", src: "assets/1_Siteplan.jpg"},
        {id: "compass_symbol", src: "assets/4_Comp.png"},
        {id: "house_thumb", src: "assets/house_thumb.png"},
        {id: "zoom_fit", src: "assets/4_ZoomFit.png"},
        {id: "zoom_fit_hover", src: "assets/4_ZoomFitHover.png"},
        {id: "zoom_in", src: "assets/4_ZoomIn.png"},
        {id: "zoom_in_hover", src: "assets/4_ZoomInHover.png"},
        {id: "zoom_out", src: "assets/4_ZoomOut.png"},
        {id: "zoom_out_hover", src: "assets/4_ZoomOutHover.png"},
        {id: "main_title_card", src: "assets/5_Card Details.png"},
        {id: "360Icon", src: "assets/360Icon.png"},
        {id: "closeIcon", src: "assets/closeIcon.png"},
        {id: "villa1", src: "assets/villa_01.png"},
        {id: "villa2", src: "assets/villa_02.png"},
        {id: "unticked", src: "assets/tick_unselected.png"},
        {id: "ticked", src: "assets/tick_selected.png"},
        {id: "houseInfoJson", type:"json", src: "js/houseInfo.json"}
        ];

    p.initialize = function(){
            this.queue1 = new createjs.LoadQueue();
            this.queue1.loadManifest(this.loadManifest1);
            this.queue1.on("complete", this.handleComplete1,this);
    }

    p.handleComplete1 = function(){
            this.dispatchEvent("loadComplete1");
    }

    p.getAsset1 = function(asset){
            return this.queue1.getResult(asset);
    }

    window.game.AssetManager = createjs.promote(AssetManager,"EventDispatcher");

}());
