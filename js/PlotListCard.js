(function () {
    window.game = window.game || {};

    var PlotListCard = function(){
        this.Container_constructor();
        this.initialize();
    }

    var p = createjs.extend(PlotListCard,createjs.Container);
    var deltaY;
    p.scrollValue = 0;
    p.houseThumbImage = null;
    p.text1a = null;
    p.text2a = null;
    p.text3a = null;
    p.text4a = null;

    p.initialize = function(){
      p.bg = new createjs.Shape();
      p.bg.graphics.beginFill("#29313b").setStrokeStyle(1,"round").s("#6e7784").drawRoundRect(0,0,710,778,10);
      p.listOffset = 50;
//////////////////////////// close button /////////////////////////////////////
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
        game.MainScreen_Scene.closePlotListCard();
      });

/////////////////////////// generating cards //////////////////////////////////
      p.houseInfoJsonObj = assets.getAsset1("houseInfoJson");
      p.cardsContainer = new createjs.Container();
      p.cardsContainer.mask = p.bg;

      p.cardsContainer.addEventListener("mousedown", function(evt){
        deltaY = evt.stageY;
      });
      p.cardsContainer.addEventListener("pressmove", function(evt){
         value = ((deltaY - evt.stageY)*-2) + p.scrollValue;
         if(value > 0){
           p.cardsContainer.y = 0;
         }else if(value < (-p.listOffset + 738)){
           p.cardsContainer.y = (-p.listOffset + 738);
         }else{
           p.cardsContainer.y = value;
           p.updateScroller();
         }
      });
      p.cardsContainer.addEventListener("pressup", function(evt){
        p.scrollValue = p.cardsContainer.y;
      });


      if (game.MainScreen_Scene.cottageSelected == 1){
        p.drawList("cottage");
      }
      if (game.MainScreen_Scene.villaSelected == 1){
        p.drawList("villa");
      }


      p.scrollContainer = new createjs.Container();
      p.setupScroll();

///////////////////////////////////////////////////////////////////////////////


      this.addChild(p.bg, p.cardsContainer, p.closeIcon, p.scrollContainer);
    }

    p.updateScroller = function(){
      position = 80 + (p.cardsContainer.y * (650 / (-p.listOffset + 738)));
      p.scrollCircle.y = position;
    }

    p.updateCardContScroll = function(){
      contPosition = (p.scrollCircle.y - 80) * ((-p.listOffset + 738) / 650);
      p.cardsContainer.y = contPosition;
    }

    p.drawList = function(houseKind){
      for (var key in p.houseInfoJsonObj) {
        if (p.houseInfoJsonObj.hasOwnProperty(key)){
          if(p.houseInfoJsonObj[key].type == houseKind){
            card = new createjs.Container();
            cardObj = new createjs.Shape();
            cardObj.graphics.beginFill("#29313b").setStrokeStyle(1,"round").s("#6e7784").drawRoundRect(0,0,610,80,5);

            p.houseThumbImage = new createjs.Bitmap(assets.getAsset1("house_thumb"));
            p.houseThumbImage.setTransform(10, 10, 0.6, 0.6);

            p.text1 = new createjs.Text("Plot Number","12px Arial", "#878787");
            p.text1.textAlign = "left";
            p.text1.setTransform(110, 10);

            p.text2 = new createjs.Text("House Type","12px Arial", "#878787");
            p.text2.textAlign = "left";
            p.text2.setTransform(240, 10);

            p.text3 = new createjs.Text("Bedrooms","12px Arial", "#878787");
            p.text3.textAlign = "left";
            p.text3.setTransform(355, 10);

            p.text4 = new createjs.Text("Status","12px Arial", "#878787");
            p.text4.textAlign = "left";
            p.text4.setTransform(500, 10);


            p.text1a = new createjs.Text("","14px Arial", "#FFFFFF");
            p.text1a.textAlign = "left";
            p.text1a.setTransform(125, 36);

            p.text2a = new createjs.Text("","14px Arial", "#FFFFFF");
            p.text2a.textAlign = "left";
            p.text2a.setTransform(250, 36);

            p.text3a = new createjs.Text("","14px Arial", "#FFFFFF");
            p.text3a.textAlign = "left";
            p.text3a.setTransform(375, 36);

            p.text4a = new createjs.Text("","14px Arial", "#FFFFFF");
            p.text4a.textAlign = "left";
            p.text4a.setTransform(500, 36);

            p.text1a.text = p.houseInfoJsonObj[key].plotNumber;
            p.text2a.text = p.houseInfoJsonObj[key].type;
            p.text3a.text = p.houseInfoJsonObj[key].bedrooms;
            p.text4a.text = p.houseInfoJsonObj[key].status;

            card.addChild(cardObj, p.houseThumbImage, p.text1, p.text2, p.text3, p.text4, p.text1a, p.text2a, p.text3a, p.text4a);
            card.setTransform(50,p.listOffset);
            p.listOffset += 90;

            p.cardsContainer.addChild(card);
          }
        }
      }
    }

    p.reDrawCards = function(){
      p.cardsContainer.removeAllChildren();
      p.listOffset = 50;
      p.scrollValue = 0;
      p.cardsContainer.y = 0;

      if (game.MainScreen_Scene.cottageSelected == 1){
        p.drawList("cottage");
      }
      if (game.MainScreen_Scene.villaSelected == 1){
        p.drawList("villa");
      }

      p.updateScroller();
      p.updateCardContScroll();

    }

    p.setupScroll = function(){
      p.scrollCircle = new createjs.Shape();
      p.scrollCircle.graphics.beginFill("#4784e0").setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,10);
      p.scrollCircle.setTransform(686.5,80);
      p.scrollLine = new createjs.Shape();
      p.scrollLine.graphics.beginFill("#6e7784").drawRoundRect(0,0,3,650,1);
      p.scrollLine.setTransform(685, 80);

      p.scrollCircle.addEventListener("mousedown", function(evt){
        scrollCircleDeltaY = p.scrollCircle.y - evt.stageY;
      });
      p.scrollCircle.addEventListener("pressmove", function(evt){
        sValue = evt.stageY + scrollCircleDeltaY;
        if(sValue < 80){
          p.scrollCircle.y = 80;
        }else if(sValue > 730){
          p.scrollCircle.y = 730;
        }else{
          p.scrollCircle.y = evt.stageY + scrollCircleDeltaY;
          p.updateCardContScroll();
        }
      });
      p.scrollCircle.addEventListener("pressup", function(evt){
        p.scrollValue = p.cardsContainer.y;
      });

      p.scrollContainer.addChild(p.scrollLine, p.scrollCircle);
    }

    window.game.PlotListCard = createjs.promote(PlotListCard,"Container");

}());
