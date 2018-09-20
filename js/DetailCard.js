(function () {
    window.game = window.game || {};

    var DetailCard = function(houseId){
        this.Container_constructor();
        this.initialize(houseId);
    }

    var p = createjs.extend(DetailCard,createjs.Container);
    p.bg = null;

    p.initialize = function(houseNum){
      p.bg = new createjs.Shape();
      p.bg.graphics.beginFill("#29313b").setStrokeStyle(1,"round").s("#6e7784").drawRoundRect(0,0,710,778,10);

      p.box1 = new createjs.Shape();
      p.box1.graphics.beginFill("#424d59").drawRoundRect(0,0,300,291,10);
      p.box1.setTransform(5, 482);

      p.box2 = new createjs.Shape();
      p.box2.graphics.beginFill("#424d59").drawRoundRect(0,0,395,168,10);
      p.box2.setTransform(310, 482);

      p.villaPic = new createjs.Bitmap(assets.getAsset1("villa1"));
      this.addChild(p.villaPic);
      p.villaPic.setTransform(5,5);

      p.text1 = new createjs.Text("Plot Number","14px Arial", "#FFFFFF");
      p.text1.textAlign = "left";
      p.text1.setTransform(120, 15);

      p.text1a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text1a.textAlign = "right";
      p.text1a.setTransform(380, 15);

      p.text2 = new createjs.Text("House Type","14px Arial", "#FFFFFF");
      p.text2.textAlign = "left";
      p.text2.setTransform(120, 45);

      p.text2a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text2a.textAlign = "right";
      p.text2a.setTransform(380, 45);

      p.text3 = new createjs.Text("Number of Bedrooms","14px Arial", "#FFFFFF");
      p.text3.textAlign = "left";
      p.text3.setTransform(120, 75);

      p.text3a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text3a.textAlign = "right";
      p.text3a.setTransform(380, 75);

      p.text4 = new createjs.Text("Status","14px Arial", "#FFFFFF");
      p.text4.textAlign = "left";
      p.text4.setTransform(120, 105);

      p.text4a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text4a.textAlign = "right";
      p.text4a.setTransform(380, 105);

      p.textBlockContainer = new createjs.Container();
      p.textBlockContainer.addChild( p.text1, p.text1a, p.text2, p.text2a, p.text3, p.text3a, p.text4, p.text4a);
      p.textBlockContainer.setTransform(250,500);

      var houseInfoJsonObj = assets.getAsset1("houseInfoJson");
      p.text1a.text = houseInfoJsonObj[houseNum].plotNumber;
      p.text2a.text = houseInfoJsonObj[houseNum].type;
      p.text3a.text = houseInfoJsonObj[houseNum].bedrooms;
      p.text4a.text = houseInfoJsonObj[houseNum].status;

      p.text5 = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text5.textAlign = "left";
      p.text5.lineWidth = 250;
      p.text5.lineHeight = 20;
      p.text5.text = houseInfoJsonObj[houseNum].detailText;
      p.text5.setTransform(25, 530);

      p.box3 = new createjs.Shape();
      p.box3.graphics.beginFill("#424d59").drawRoundRect(0,0,395,118,10);
      p.box3_mouseOver = new createjs.Shape();
      p.box3_mouseOver.graphics.beginFill("#687482").drawRoundRect(0,0,395,118,10);
      p.box3_mouseOver.alpha = 0;

      p.text6 = new createjs.Text("Click here for 360° view","14px Arial", "#FFFFFF");
      p.text6.setTransform(70, 50);

      p.panoIcon = new createjs.Bitmap(assets.getAsset1("360Icon"));
      p.panoIcon.setTransform(240, 40);

      p.panoButtonContainer = new createjs.Container();
      p.panoButtonContainer.addChild(p.box3, p.box3_mouseOver, p.text6, p.panoIcon);
      p.panoButtonContainer.setTransform(310, 655);
      p.panoButtonContainer.addEventListener("mouseover", function(evt){
        p.box3.alpha = 0;
        p.box3_mouseOver.alpha = 1;
      });
      p.panoButtonContainer.addEventListener("mouseout", function(evt){
        p.box3.alpha = 1;
        p.box3_mouseOver.alpha = 0;
      });
      p.panoButtonContainer.addEventListener("click", function(evt){
        var customEvent = new Event('launchPano');
        document.getElementById("controlDiv").dispatchEvent(customEvent);
      });


      p.closeIconHit = new createjs.Shape();
      p.closeIconHit.graphics.beginFill("#424d59").drawRoundRect(0,0,30,30,3);

      p.closeIcon = new createjs.Bitmap(assets.getAsset1("closeIcon"));
      p.closeIcon.alpha = 0.5;
      p.closeIcon.setTransform(670, 10);
      p.closeIcon.hitArea = p.closeIconHit;

      p.closeIcon.addEventListener("mouseover", function(){
        p.closeIcon.alpha = 1;
      });
      p.closeIcon.addEventListener("mouseout", function(){
        p.closeIcon.alpha = 0.5;
      });
      p.closeIcon.addEventListener("mousedown", function(){
        game.MainScreen_Scene.closeDetailCard();
      });

      this.addChild(p.bg, p.box1, p.box2, p.villaPic, p.textBlockContainer, p.text5, p.closeIcon, p.panoButtonContainer);
    }


    window.game.DetailCard = createjs.promote(DetailCard,"Container");

}());
