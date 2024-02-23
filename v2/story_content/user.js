function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6Jt7bslqoYJ":
        Script1();
        break;
      case "6HQpuVK3yfK":
        Script2();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  console.log("Recording starts");
}

window.Script2 = function()
{
  console.log("Recording stops");
}

};
