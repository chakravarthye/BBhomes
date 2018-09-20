(function () {
    window.game = window.game || {};

    var MainScreen = function(){
        this.Container_constructor();
        this.initialize();
    }

    var p = createjs.extend(MainScreen,createjs.Container);

    var zoomExtentsScale, newZoomScale, deltaX, deltaY;

    p.plotListExists = 0;
    p.newCard = null;

    p.initialize = function(){

      p.site_plan_obj = null;
      p.detailCard = null;
      p.detailCardContainer = null;
      p.dummyMapBG = null;
      p.houseStatusArray = [];
      p.unloadedContainer = new createjs.Container();
      p.plotListContainer = null;
      p.listCard = null;
      p.plotListText = null;
      p.plotListButtonCont = null;
      p.plotListButtonHover = null;
      p.villaSelected = 1;
      p.cottageSelected = 1;
      p.villaTick = null;
      p.villaUntick = null;
      p.cottageTick = null;
      p.cottageUntick = null;
      p.housesContainer = null;
      p.houseInfoJsonObj = assets.getAsset1("houseInfoJson");

/////////////////////// Site plan setup ////////////////////////////////
      p.site_plan_obj = new createjs.Container();
      p.housesContainer = new createjs.Container();

      p.site_plan_map = new createjs.Bitmap(assets.getAsset1("site_plan"));
      ///
      p.site_plan_obj.addChild(p.site_plan_map, p.housesContainer);

      p.dummyMap = new createjs.Bitmap(assets.getAsset1("site_plan"));
      p.dummyMap.regX = p.dummyMap.image.width/2;
      p.dummyMap.regY = p.dummyMap.image.height/2;
//////////////////////////////// house shapes setup ////////////////////////////////

      p.drawHouses("villa");
      p.drawHouses("cottage");

//////////////////////////////////////////////////////////////////////////////////

      p.site_plan_obj.regX = p.site_plan_map.image.width/2;
      p.site_plan_obj.regY = p.site_plan_map.image.height/2;
      p.site_plan_obj.x = (canvas.width/2) + 180;
      p.site_plan_obj.y = (canvas.height/2) - 50;

      zoomExtentsScale = (canvas.width / p.site_plan_map.image.width) + 0.1;
      if(canvas.height / p.site_plan_map.image.height < zoomExtentsScale){
        zoomExtentsScale = (canvas.height / p.site_plan_map.image.height) + 0.1;
      }
      if(zoomExtentsScale > 1){
        zoomExtentsScale = 1;
      }

      newZoomScale = zoomExtentsScale;

      p.site_plan_obj.scaleX = zoomExtentsScale;
      p.site_plan_obj.scaleY = zoomExtentsScale;

      p.site_plan_obj.addEventListener("mousedown", function(evt){
        deltaX = p.site_plan_obj.x - evt.stageX;
        deltaY = p.site_plan_obj.y - evt.stageY;
      });

      p.site_plan_obj.addEventListener("pressmove", function(evt){
        p.site_plan_obj.x = evt.stageX + deltaX;
        p.site_plan_obj.y = evt.stageY + deltaY;
      });

      p.site_plan_obj.addEventListener("dblclick", function(evt){
        p.mapZoomIn(evt.stageX, evt.stageY);
        inverseScale = 1/newZoomScale;
        p.popCard.setTransform(0,0,inverseScale,inverseScale);
        p.popCard.x = evt.target.x + 60;
        p.popCard.y = evt.target.y + 60;
      });


////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////// Main title card setup ////////////////////////////////
      var main_title_card_obj = new createjs.Bitmap(assets.getAsset1("main_title_card"));
      main_title_card_obj.x = main_title_card_obj.y = 24;


      p.plotListButtonCont = new createjs.Container();
      p.plotListButton = new createjs.Shape();
      p.plotListButton.graphics.beginFill("#616a72").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);

      p.plotListButtonHover = new createjs.Shape();
      p.plotListButtonHover.graphics.beginFill("#d2d9e0").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);
      p.plotListButtonHover.alpha = 0;

      p.plotListText = new createjs.Text("View Full Plot List","14px Arial", "#000000");
      p.plotListText.setTransform(40,7);

      p.plotListButtonCont.addChild(p.plotListButton, p.plotListButtonHover, p.plotListText);
      p.plotListButtonCont.setTransform(100, 700);
      p.plotListButtonCont.addEventListener("mouseover", function(){
        p.plotListButtonHover.alpha = 1;
      });
      p.plotListButtonCont.addEventListener("mouseout", function(){
        p.plotListButtonHover.alpha = 0;
      });
      p.plotListButtonCont.addEventListener("click", function(){
        p.unloadedContainer.addChild(p.site_plan_obj, p.navigationControlsGrp, p.legendGrp, p.plotListButtonCont);
        p.showPlotListCard();
      });

////////////////////// villa and cottage options ///////////////////////////
      p.villaButtonCont = new createjs.Container();

      p.villaTick = new createjs.Bitmap(assets.getAsset1("ticked")); p.villaTick.setTransform(10, 5, 0.75, 0.75);
      p.villaUntick = new createjs.Bitmap(assets.getAsset1("unticked")); p.villaUntick.setTransform(10, 5, 0.75 ,0.75);

      p.villaButton = new createjs.Shape();
      p.villaButton.graphics.beginFill("#616a72").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);

      p.villaButtonHover = new createjs.Shape();
      p.villaButtonHover.graphics.beginFill("#d2d9e0").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);
      p.villaButtonHover.alpha = 0;

      p.villaButtonSelected = new createjs.Shape();
      p.villaButtonSelected.graphics.beginFill("#008426").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);
      p.villaButtonSelected.alpha = 0.75;

      p.villaText = new createjs.Text("Show Villa","14px Arial", "#000000");
      p.villaText.setTransform(60,7);

      p.villaButtonCont.addChild(p.villaButton, p.villaButtonHover, p.villaButtonSelected, p.villaUntick, p.villaTick, p.villaText);
      p.villaButtonCont.setTransform(100, 650);

      p.villaButtonCont.addEventListener("mouseover", function(){
        if(p.villaSelected != 1){
          p.villaButtonSelected.alpha = 0;
          p.villaTick.alpha = 0;
          p.villaButtonHover.alpha = 0.5;
        }else{
          p.villaButtonHover.alpha = 1;
        }
      });
      p.villaButtonCont.addEventListener("mouseout", function(){
        p.villaButtonHover.alpha = 0;
        if(p.villaSelected != 1){
          p.villaButtonSelected.alpha = 0;
          p.villaTick.alpha = 0;
        }
      });
      p.villaButtonCont.addEventListener("click", function(){
        if(p.villaSelected != 1){
          p.villaSelected = 1;
          p.villaButtonSelected.alpha = 0.75;
          p.villaTick.alpha = 1;
          if(p.plotListExists == 1){
            p.listCard.reDrawCards();
          }else{
            p.reDrawHouses();
          }
        }else{
          p.villaSelected = 0;
          p.villaButtonSelected.alpha = 0;
          p.villaTick.alpha = 0;
          if(p.plotListExists == 1){
            p.listCard.reDrawCards();
          }else{
            p.reDrawHouses();
          }
        }
        p.villaButtonHover.alpha = 0;
      });


      p.cottageButtonCont = new createjs.Container();

      p.cottageTick = new createjs.Bitmap(assets.getAsset1("ticked")); p.cottageTick.setTransform(10, 5, 0.75, 0.75);
      p.cottageUntick = new createjs.Bitmap(assets.getAsset1("unticked")); p.cottageUntick.setTransform(10, 5, 0.75 ,0.75);

      p.cottageButton = new createjs.Shape();
      p.cottageButton.graphics.beginFill("#616a72").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);

      p.cottageButtonHover = new createjs.Shape();
      p.cottageButtonHover.graphics.beginFill("#d2d9e0").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);
      p.cottageButtonHover.alpha = 0;

      p.cottageButtonSelected = new createjs.Shape();
      p.cottageButtonSelected.graphics.beginFill("#008426").setStrokeStyle(1,"round").s("#3b3e42").drawRoundRect(0,0,195,30,5);
      p.cottageButtonSelected.alpha = 0.75;

      p.cottageText = new createjs.Text("Show Cottage","14px Arial", "#000000");
      p.cottageText.setTransform(60,7);

      p.cottageButtonCont.addChild(p.cottageButton, p.cottageButtonHover, p.cottageButtonSelected, p.cottageUntick, p.cottageTick, p.cottageText);
      p.cottageButtonCont.setTransform(100, 600);

      p.cottageButtonCont.addEventListener("mouseover", function(){
        if(p.cottageSelected != 1){
          p.cottageButtonSelected.alpha = 0;
          p.cottageTick.alpha = 0;
          p.cottageButtonHover.alpha = 0.5;
        }else{
          p.cottageButtonHover.alpha = 1;
        }
      });
      p.cottageButtonCont.addEventListener("mouseout", function(){
        p.cottageButtonHover.alpha = 0;
        if(p.cottageSelected != 1){
          p.cottageButtonSelected.alpha = 0;
          p.cottageTick.alpha = 0;
        }
      });
      p.cottageButtonCont.addEventListener("click", function(){
        if(p.cottageSelected != 1){
          p.cottageSelected = 1;
          p.cottageButtonSelected.alpha = 0.75;
          p.cottageTick.alpha = 1;
          if(p.plotListExists == 1){
            p.listCard.reDrawCards();
          }else{
            p.reDrawHouses();
          }
        }else{
          p.cottageSelected = 0;
          p.cottageButtonSelected.alpha = 0;
          p.cottageTick.alpha = 0;
          if(p.plotListExists == 1){
            p.listCard.reDrawCards();
          }else{
            p.reDrawHouses();
          }
        }
        p.cottageButtonHover.alpha = 0;
      });



//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Zoom controls ////////////////////////////////

      var compass_obj = new createjs.Bitmap(assets.getAsset1("compass_symbol"));
      compass_obj.x = canvas.width - 50; compass_obj.y = 50;


      var zoom_fit_button_obj = new game.ImageButton("zoom_fit");
      zoom_fit_button_obj.x = canvas.width - 50; zoom_fit_button_obj.y = 150;
      zoom_fit_button_obj.updateTgt(this, "mapZoomReset");

      var zoom_in_button_obj = new game.ImageButton("zoom_in");
      zoom_in_button_obj.x = canvas.width - 50; zoom_in_button_obj.y = 200;
      zoom_in_button_obj.updateTgt(this, "mapZoomIn");


      var zoom_out_button_obj = new game.ImageButton("zoom_out");
      zoom_out_button_obj.x = canvas.width - 50; zoom_out_button_obj.y = 250;
      zoom_out_button_obj.updateTgt(this, "mapZoomOut");

      p.navigationControlsGrp = new createjs.Container();
      p.navigationControlsGrp.addChild(compass_obj, zoom_fit_button_obj, zoom_in_button_obj, zoom_out_button_obj)

//////////////////////////////// popUpCard ////////////////////////////////

      p.popCardShape = new createjs.Shape();
      p.popCardShape.graphics.beginFill("#29313b").setStrokeStyle(1,"round").s("#6e7784").drawRoundRect(0,0,300,120,5);

      p.houseThumbImage = new createjs.Bitmap(assets.getAsset1("house_thumb"));
      p.houseThumbImage.setTransform(10, 10);

      p.text1 = new createjs.Text("Plot Number:","14px Arial", "#FFFFFF");
      p.text1.textAlign = "left";
      p.text1.setTransform(120, 15);

      p.text1a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text1a.textAlign = "left";
      p.text1a.setTransform(210, 15);

      p.text2 = new createjs.Text("House Type:","14px Arial", "#FFFFFF");
      p.text2.textAlign = "left";
      p.text2.setTransform(120, 40);

      p.text2a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text2a.textAlign = "left";
      p.text2a.setTransform(210, 40);

      p.text3 = new createjs.Text("Number of Bedrooms:","14px Arial", "#FFFFFF");
      p.text3.textAlign = "left";
      p.text3.setTransform(120, 65);

      p.text3a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text3a.textAlign = "left";
      p.text3a.setTransform(270, 65);

      p.text4 = new createjs.Text("Status:","14px Arial", "#FFFFFF");
      p.text4.textAlign = "left";
      p.text4.setTransform(120, 90);

      p.text4a = new createjs.Text("","14px Arial", "#FFFFFF");
      p.text4a.textAlign = "left";
      p.text4a.setTransform(180, 90);

      p.popCard = new createjs.Container();
      p.popCard.addChild(p.popCardShape, p.houseThumbImage, p.text1, p.text2, p.text3, p.text1a, p.text2a, p.text3a, p.text4, p.text4a);
      p.site_plan_obj.addChild(p.popCard);
      p.popCard.alpha = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// Availability Legends ///////////////////////////////////////////////////
      p.availableLegend = new createjs.Shape();
      p.availableLegend.graphics.beginFill("#00b238").setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,5);
      p.availableText = new createjs.Text("Available","14px Arial", "#000000");
      p.availableText.textAlign = "left"; p.availableText.setTransform(10, -7);

      p.soldLegend = new createjs.Shape();
      p.soldLegend.graphics.beginFill("#db1c1c").setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,5);
      p.soldLegend.setTransform(100, 0);
      p.soldText = new createjs.Text("Sold","14px Arial", "#000000");
      p.soldText.textAlign = "left"; p.soldText.setTransform(110, -7);

      p.reservedLegend = new createjs.Shape();
      p.reservedLegend.graphics.beginFill("#e8ce09").setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,5);
      p.reservedLegend.setTransform(180, 0);
      p.reservedText = new createjs.Text("Reserved","14px Arial", "#000000");
      p.reservedText.textAlign = "left"; p.reservedText.setTransform(190, -7);

      p.comingLegend = new createjs.Shape();
      p.comingLegend.graphics.beginFill("#ff8300").setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,5);
      p.comingLegend.setTransform(280, 0);
      p.comingText = new createjs.Text("Coming Soon","14px Arial", "#000000");
      p.comingText.textAlign = "left"; p.comingText.setTransform(290, -7);

      p.legendGrp = new createjs.Container();
      p.legendGrp.addChild(p.availableLegend, p.availableText, p.soldLegend, p.soldText, p.reservedLegend, p.reservedText, p.comingLegend, p.comingText);
      p.legendGrp.setTransform(500, 800);

      p.detailCardContainer = new createjs.Container();
      p.dummyMapBG = new createjs.Container();
      p.plotListContainer = new createjs.Container();

      this.addChild(p.site_plan_obj, p.dummyMapBG, main_title_card_obj, p.plotListButtonCont, p.navigationControlsGrp, p.legendGrp, p.detailCardContainer, p.plotListContainer, p.villaButtonCont, p.cottageButtonCont );
    }

    p.drawHouses = function(houseType){
      var shapePosX, shapePosY;
      var outlineShape;

      for (var houseKey in p.houseInfoJsonObj) {
      if (p.houseInfoJsonObj.hasOwnProperty(houseKey)) {
        if(p.houseInfoJsonObj[houseKey].type == houseType){
            outlineShape = p.houseInfoJsonObj[houseKey].outline;
            shapePosX = p.houseInfoJsonObj[houseKey].outlinePosX;
            shapePosY = p.houseInfoJsonObj[houseKey].outlinePosY;

            houseShape = new createjs.Shape();
            houseShape.graphics.beginFill("#56e8ff").setStrokeStyle(5,"round").s("#0cb20e").p(outlineShape);
            houseShape.setTransform(shapePosX, shapePosY);
            houseShape.houseId = houseKey;
            houseShape.alpha = 0.1;

            switch(p.houseInfoJsonObj[houseKey].status){
              case "Available":
                houseStatusColor = "#00b238";break;
              case "Sold":
                houseStatusColor = "#db1c1c"; break;
              case "Reserved":
                houseStatusColor = "#e8ce09"; break;
              case "Coming Soon":
                houseStatusColor = "#ff8300"; break;
            }

            houseStatus = new createjs.Shape();
            houseStatus.graphics.beginFill(houseStatusColor).setStrokeStyle(1,"round").s("#000000").drawCircle(0,0,18);
            p.houseStatusArray[houseKey] = houseStatus;
            houseStatus.setTransform(shapePosX, shapePosY);

            houseShape.addEventListener("mouseover",function(evt){
              p.houseStatusArray[evt.target.houseId].alpha = 0;

              evt.target.alpha = 0.9;

              p.text1a.text = p.houseInfoJsonObj[evt.target.houseId].plotNumber;
              p.text2a.text = p.houseInfoJsonObj[evt.target.houseId].type;
              p.text3a.text = p.houseInfoJsonObj[evt.target.houseId].bedrooms;
              p.text4a.text = p.houseInfoJsonObj[evt.target.houseId].status;

              p.popCard.alpha = 0.9;
              inverseScale = 1/newZoomScale;
              p.popCard.setTransform(0,0,inverseScale,inverseScale);

              p.popCard.x = evt.target.x + 60;
              p.popCard.y = evt.target.y + 60;

            });

            houseShape.addEventListener("mouseout",function(evt){
              evt.target.alpha = 0.1;
              p.popCard.alpha = 0.0;
              p.houseStatusArray[evt.target.houseId].alpha = 1;
            });

            houseShape.addEventListener("pressup",function(evt){
              p.unloadedContainer.addChild(p.site_plan_obj, p.navigationControlsGrp, p.legendGrp);
              p.showDetailCard();
            });

            p.housesContainer.addChild(houseShape, houseStatus);
        }
        }
      }
    }

    p.reDrawHouses = function(){
      p.housesContainer.removeAllChildren();

      if(p.villaSelected == 1){
        p.drawHouses("villa");
      }
      if(p.cottageSelected == 1){
        p.drawHouses("cottage");
      }

    }

    p.closeDetailCard = function(){
      this.addChildAt(p.site_plan_obj, 0);
      this.addChild(p.navigationControlsGrp, p.legendGrp);
      p.detailCardContainer.removeChild(p.detailCard);
      p.unloadedContainer.addChild(p.dummyMap);
    }

    p.closePlotListCard = function(){
      p.plotListExists = 0;
      this.addChildAt(p.site_plan_obj, 0);
      this.addChild(p.navigationControlsGrp, p.legendGrp, p.plotListButtonCont);
      p.plotListContainer.removeChild(p.listCard);
      p.unloadedContainer.addChild(p.dummyMap);
      p.reDrawHouses();
    }

    p.showDetailCard = function(){
      p.detailCard = new game.DetailCard("house_15");
      p.detailCard.setTransform(393, 24)
      p.detailCard.alpha = 0.9;


      p.dummyMap.x = p.site_plan_obj.x;
      p.dummyMap.y = p.site_plan_obj.y;
      p.dummyMap.scaleX = p.dummyMap.scaleY = p.site_plan_obj.scaleX;
      p.dummyMapBG.addChildAt(p.dummyMap, 0);

      p.detailCardContainer.addChild(p.detailCard);
    }
////////////////////////editing////////////////
    p.showPlotListCard = function(){
      p.plotListExists = 1;
      p.listCard = new game.PlotListCard();
      p.listCard.setTransform(393, 24)
      p.listCard.alpha = 0.9;


      p.dummyMap.x = p.site_plan_obj.x;
      p.dummyMap.y = p.site_plan_obj.y;
      p.dummyMap.scaleX = p.dummyMap.scaleY = p.site_plan_obj.scaleX;
      p.dummyMapBG.addChildAt(p.dummyMap, 0);

      p.plotListContainer.addChild(p.listCard);
    }
////////////////////////editing///////////////

    p.mapZoomIn = function(mX, mY){
      if(newZoomScale < 1){
        newZoomScale += 0.1;

        createjs.Tween.get(p.site_plan_obj)
            .to({scaleX:newZoomScale, scaleY:newZoomScale}, 150, createjs.Ease.quadInOut);

        if(mX || mY){
          var diffX = canvas.width/2 - mX;
          var diffY = canvas.height/2 - mY;
          diffX += p.site_plan_obj.x;
          diffY += p.site_plan_obj.y;

          createjs.Tween.get(p.site_plan_obj)
              .to({x:diffX, y:diffY}, 150, createjs.Ease.quadInOut);
        }
      }
    }

    p.mapZoomOut = function(){
      if(newZoomScale > (zoomExtentsScale-0.1)){
        newZoomScale -= 0.1;

        createjs.Tween.get(p.site_plan_obj)
            .to({scaleX:newZoomScale, scaleY:newZoomScale}, 150, createjs.Ease.quadInOut);
      }
    }

    p.mapZoomReset = function(){
        var sX = zoomExtentsScale;
        var tX = (canvas.width/2) + 180;
        var tY = canvas.height/2 - 50;
        createjs.Tween.get(p.site_plan_obj)
            .to({scaleX:sX, scaleY:sX, x:tX, y:tY}, 150, createjs.Ease.quadInOut);
        newZoomScale = zoomExtentsScale;
    }


    window.game.MainScreen = createjs.promote(MainScreen,"Container");

    }());
