const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const dolar = require("../../schemas/dolar")
const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/settings.json")
const { red, green, rewards } = require("../../configs/emojis.json")

module.exports = {
    conf: {
      aliases: ["market","shop"],
      name: "market",
      help: "market"
    },

 run: async (client, message) => {

  let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  

  let spotify = new disbut.MessageMenuOption()
  .setLabel("Ürün : Spotify Premium")
  .setValue("spotify")
  .setEmoji("941993326700265512")
  .setDescription("💳 Fiyat : 40.000 💰")

  let netflix = new disbut.MessageMenuOption()
  .setLabel("Ürün : Netflix UHD")
  .setValue("netflix")
  .setEmoji("941993358518284298")
  .setDescription("💳 Fiyat : 50.000 💰")

  let youtube = new disbut.MessageMenuOption()
  .setLabel("Ürün : Youtube Premium")
  .setValue("youtube")
  .setEmoji("941993963013935115")
  .setDescription("💳 Fiyat : 60.000 💰")

  let cnitro = new disbut.MessageMenuOption()
  .setLabel("Ürün : Classic Nitro")
  .setValue("cnitro")
  .setEmoji("941993712978890752")
  .setDescription("💳 Fiyat : 125.000 💰")

  let bnitro = new disbut.MessageMenuOption()
  .setLabel("Ürün : Boost Nitro")
  .setValue("bnitro")
  .setEmoji("941993742934614047")
  .setDescription("💳 Fiyat : 150.000 💰")


  let market = new disbut.MessageMenu();
  market.setID("market");
  market.setPlaceholder(`Ürünlerimizi listelemek için tıklayın.`)
  market.addOptions(spotify,netflix,youtube,cnitro,bnitro);
 
   const MenuMessage = await message.channel.send(`:tada: **${message.guild.name} Mağazasına Hoşgeldiniz!**

💰 Dolarınız : **${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0}**

   `, market);
  
   const filter = (menu) => menu.clicker.user.id === message.author.id;
   const Collector = MenuMessage.createMenuCollector(filter, { time: 9999999 });


   Collector.on("collect", async (menu) => {
  let dolarData = await dolar.findOne({ guildID: ayar.guildID, userID: menu.clicker.user.id });  

    if (menu.values[0] === "spotify") {
      if(40000 > dolarData.dolar) 
      {
          await menu.reply.send(`\`Spotify Premium\` ürününü almak için **Dolar**'ın yetersiz!`, true)
          return
      }
       await menu.reply.send(`:tada: Tebrikler! Başarıyla \`Spotify Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`, true)
       client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Spotify Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
      await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -40000 } }, { upsert: true });
    }
    
    
  if (menu.values[0] === "netflix") {
    if(50000 > dolarData.dolar) 
    {
        await menu.reply.send(`\`Netflix UHD\` ürününü almak için **Dolar**'ın yetersiz!`, true)
        return
    }
     await menu.reply.send(`:tada: Tebrikler! Başarıyla \`Netflix UHD\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`, true)
     client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Netflix UHD\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
    await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -50000 } }, { upsert: true });
  }
  
  

  if (menu.values[0] === "youtube") {
    if(60000 > dolarData.dolar) 
    {
        await menu.reply.send(`\`Youtube Premium\` ürününü almak için **Dolar**'ın yetersiz!`, true)
        return
    }
    await menu.reply.send(`:tada: Tebrikler! Başarıyla \`Youtube Premium\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`, true)
    client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Youtube Premium\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
    await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -60000 } }, { upsert: true });
  }
  
  

if (menu.values[0] === "cnitro") {
  if(125000 > dolarData.dolar) 
  {
      await menu.reply.send(`\`Classic Nitro\` ürününü almak için **Dolar**'ın yetersiz!`, true)
      return
  }
   await menu.reply.send(`:tada: Tebrikler! Başarıyla \`Classic Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`, true)
   client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Classic Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
  await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -125000 } }, { upsert: true });
}



if (menu.values[0] === "bnitro") {
  if(150000 > dolarData.dolar) 
  {
      await menu.reply.send(`\`Boostlu Nitro\` ürününü almak için **Dolar**'ın yetersiz!`, true)
      return
  }
   await menu.reply.send(`:tada: Tebrikler! Başarıyla \`Boost Nitro\` ürününü satın aldınız! Yetkililer en kısa zaman da sizinle iletişime geçecektir!`, true)
   client.channels.cache.get(conf.marketLog).send(`${menu.clicker.member.toString()} kişisi \`Boostlu Nitro\` ürününü satın aldı. İletişime geçmenizi bekliyor! :tada:`)
  await dolar.findOneAndUpdate({ guildID: ayar.guildID, userID: menu.clicker.member.id }, { $inc: { dolar: -150000 } }, { upsert: true });
}

});

},
}
