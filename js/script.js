const $response = document.getElementById('time')

//FETCH IMAGES FROM NASA
$.ajax({
    url: 'https://api.nasa.gov/planetary/apod?api_key=FVdtQLof46yzd7s2c791XO1PrP6E80ULighcbI2L',
    method: 'GET',
    dataType: 'json'
  })
  .done(function (data) {
      const media_type = data.media_type
      if(media_type && media_type == 'image'){
        const dataUrl = data.url
        if(dataUrl){
          imgSrc = dataUrl;
        }
        $("body").css("background-image",`url('${imgSrc}')`)
      }
  })
  .fail(function (err) {
    console.error(err)
    $("body").css("background-image",`url('${imgSrc}')`)
  })

//SETTINGS - LOCAL
let settingClockLocal = $("input[name='settingClock']:checked").val()
let settingDayLocal = $("input[name='settingDay']:checked").val()

//STORAGE
let storage=window.localStorage;
let settingClockStorage =  storage["settingClock"]
let settingDayStorage =  storage["settingDay"]
if(settingClockStorage){
    settingClockLocal = settingClockStorage
    //24 HOUR CLOCK SETTING 
    if(1 == settingClockLocal){
        $("#clockYes").prop("checked",true)
        $("#clockNo").prop("checked",false)
    }else{
        $("#clockYes").prop("checked",false)
        $("#clockNo").prop("checked",true)
    }
}
if(settingDayStorage){
    settingDayLocal = settingDayStorage
    // SHOW DATE SETTING
    if(1 == settingDayLocal){
        $("#dayYes").prop("checked",true)
        $("#dayNo").prop("checked",false)
    }else{
        $("#dayYes").prop("checked",false)
        $("#dayNo").prop("checked",true)
    }
}

//SHOW TIME
function showTime(){
    let myDate = new Date;
    let time = ""
    let h = myDate.getHours()//GET CURRENT HOURS(0-23)
    let m = myDate.getMinutes()//GET CURRENT MINUTES(0-59)
    let s = myDate.getSeconds()//GET SECONDS
    if(settingClockLocal == 1){
        time = `${h}:${m}:${s}`
    }else{
        let t = 'AM'
        if(h>11){
            t = 'PM'
        }
        h = h%12
        time = `${h}:${m}:${s} ${t}`
    }
    $(".time").text(time)
    showGreetings(h)
    showDay(myDate)
    dayOfWeek(myDate)
    dayOfMonth(myDate)
    dayInYear(myDate)
    weekInYear(myDate)
}

//FUNCTION SHOW GREETINGS
function showGreetings(h){
    let greetings = "HELLO WORLD!"
    if(h>=18){
        greetings = "GOOD EVENING!"
    }else if(h>=12){
        greetings = "GOOD AFTERNOON!"
    }else{
        greetings = "GOOD MORNING!"
    }
    $(".greetings").text(greetings)
}

//FUNCTION SHOW DATE 
function showDay(obj){
    let show = ""
    let year = obj.getFullYear() //GET FULL YEAR
    let mon = obj.getMonth() + 1 //GET CURRENT MONTH
    let date = obj.getDate()
    if(settingDayLocal == 1){
        show = `${date}/${mon}/${year}`
    }
    $(".date").text(show)
}

//FUNCTION SHOW DAY OF WEEK
function dayOfWeek(obj){
    let week = obj.getDay()
    let weeks = ["Sunday", "Monday", "Tuesday", "Wendnesday", "Thursday", "Friday", "Saterday"]
    $("#unitWeek").text(`${weeks[week]}`)
}

//FUNCTION SHOW DAY OF MONTH
function dayOfMonth(obj){
    let mon = obj.getMonth() + 1 //GET MONTH
    $("#unitMonth").text(`${mon}`)
}

//FUNCTION SHOW DAYS IN THE YEAR
function dayInYear(obj){
    let unitDayOfYear = Math.ceil(( obj - new Date(obj.getFullYear().toString()))/(24*60*60*1000))
    $("#unitDayOfYear").text(`${unitDayOfYear}`)
}

//FUNCTION SHOW WEEK IN THE YEAR
function weekInYear(obj){
    let d1 = obj;
    let d2 = new Date(obj);
    d2.setMonth(0);
    d2.setDate(1);
    let rq = d1-d2;
    let days = Math.ceil(rq/(24*60*60*1000));
    let unitWeekOfYear = Math.ceil(days/7);
    $("#unitWeekOfYear").text(`${unitWeekOfYear}`)
}
  
//BIND SETTING BUTTON CLICK 
$(".menuButton").bind('click', function(){
    menuDisplay = $(".settingMenu")[0].style.display;
    if(menuDisplay && "block" == menuDisplay){
        $(".settingMenu").hide()
    }else{
        $(".settingMenu").show()
    }
})
  
//BIND SAVE BUTTON CLICK
$(".save").bind('click', function(){
    settingClockLocal = $("input[name='settingClock']:checked").val()
    settingDayLocal = $("input[name='settingDay']:checked").val()
    storage.setItem("settingClock",settingClockLocal)
    storage.setItem("settingDay",settingDayLocal)
    showTime()
    $(".settingMenu").hide()
})

//BIND MORE BUTTON CLICK 
$(".more").bind('click', function(){
    if("MORE"==$(".more").text()){
        $(".more").text('LESS')
        $(".fadeContainer").fadeIn(1000,Object)
    }else{
        $(".more").text('MORE')
        $(".fadeContainer").fadeOut(1000,Object)
    }
})

showTime()
setInterval("showTime()", 1000)