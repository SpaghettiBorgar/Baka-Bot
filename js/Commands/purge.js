module.exports = {
  description_engrish: "delet a lot of messages",
  description_german: "Lösche viele Nachrichten",
  usage: "purge <amount>",
  func: (msg, arg) => {
    if (msg.member.roles.has("373604689654054912") == false)
      return;
    let amount = Math.round(parseFloat(arg[0]));
    if (isNaN(amount) || amount == null)
      return;
    if (amount > 100)
      return msg.reply(":x:This is too much!");
    msg.channel.bulkDelete(amount + 1).then(()=>{
      msg.channel.send(":ok_hand:").then(mes=>{
        setTimeout(function(){
          mes.delete();
        }, 5000);
      });
    });
  }
}
