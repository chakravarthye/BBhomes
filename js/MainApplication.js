(function(){
  window.game = window.game || {};

  var MainApplication = function(){
        this.initialize();
    };

  var p = MainApplication.prototype;

  p.initialize = function() {
      stage = new createjs.Stage(document.getElementById('canvas'));
      stage.enableMouseOver(20);
      createjs.Ticker.framerate = 60;
      createjs.Ticker.addEventListener("tick", this.handleTick);

      assets = new game.AssetManager();
      assets.on("loadComplete1",this.launchMainScreen,this);

      document.getElementById("controlDiv").addEventListener("launchPano", function(){
        game.vrScene();
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("Close VR");
        btn.id = "closeVRButton";
        btn.appendChild(t);
        document.body.appendChild(btn);
        document.getElementById("closeVRButton").addEventListener("click", function(){
          var element1 = document.getElementById("closeVRButton");
          document.body.removeChild(element1);
          var element2 = document.getElementById("vrCanvas");
          document.body.removeChild(element2);
        });
      });
      document.getElementById("controlDiv").addEventListener("endPano", function(){
        var element = document.getElementById("vrCanvas");
        document.body.removeChild(element);
      });
  };

  p.handleTick = function() {
      stage.update();
  };

  p.launchMainScreen = function(){
      stage.removeAllChildren();
      window.game.MainScreen_Scene = window.game.MainScreen_Scene || new game.MainScreen();
      stage.addChild(window.game.MainScreen_Scene);
  };

  window.game.MainApplication = MainApplication;
})();
