//complete all hidden tasks

var tasks = [
  {
    action: function(){
      console.log('say hello');
      window.helloWorld();
    }
  },

  {
    action: function(){
      console.log('get your hint');
      window.hint();
    }
  },

  {
    action: function(){
      console.log('try the puzzle');
      window.puzzle();
    }
  },

  {
    action: function(){
      var r = document.getElementById('rabbit');
      //r.classList.add('tutle') doesn't trigger observer
      r.className = 'turtle'
    }
  },

  {
    wait: true,
    action: function(){
      window.weird();
    }
  },

  {
    wait: true,
    action: function(){
      window.decode("Y3JlYXRpdmVsYWI1LmNvbS9yYWJiaXRob2xl");
    }
  },

  {
    wait: true,
    action: function(){
      /*
btoa("ÛËc") -- 28tj
atob("MTA=") -- 10
Math.pow(6, 2) -- 36

return t !== o(btoa("ÛËc"), o(atob("MTA="), Math.pow(6, 2))) ? console.log("Nope.") : (window.penToolActivated = !0,
        window.finalTest = v,

parseInt("28tj", parseInt(10, 36)); -- 104743
      */
      
      window.activatePen(104743);
      window.penToolActivated = false;//no need, we activate it when we need it
    }
  },

  {
    wait: true,
    action: function(){
      var cursor = 0;
      var tester = function(color){
        var expectations = ["#0000FF", "#4285F4", "#FF0000", "#EA4235", "#FFFF00", "#FBBC05", "#00FF00", "#34A853"];
        var result = expectations[expectations.indexOf(color) + 1];

        return result;
      }

      cursor++;
      window.finalTest(tester)
    }
  },

  {
    wait: true,
    action: function(){
      console.log('phewww boy, it\'s done! 🙌');
    }
  }
]

var start = function(){
  
  var cursor = 0;
  next();

  function run(item){
    if(item.wait){
      setTimeout(item.action, 100);
    }else{
      item.action()
    }
    
    next();
  }

  function next(){
    if(cursor < tasks.length){
      var item = tasks[cursor++];
      run(item); 
    }
  }  
}


window.startHintRunner = start;